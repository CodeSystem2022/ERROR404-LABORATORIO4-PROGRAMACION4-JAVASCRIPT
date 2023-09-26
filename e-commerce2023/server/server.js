//paquetes
const express = require("express");//importacion marco Express
const app = express();//creando instancia del express
const cors = require("cors");//paquete de seguiridad para navegadores
const mercadopago = require("mercadopago");//importacion del paquere de procesamiento de pago
const path = require("path");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({//configurar el paquete token de acceso
	access_token: "",
});


app.use(express.urlencoded({ extended: false }));//uso de middleware para analizar solicitudes entrantes con cargas útiles codificadas en url
app.use(express.json());//analizar solicitudes entrantes con carga útiles archivos json
//app.use(express.static("../../client/html-js"));//redirigiendo a archivos estaticos
//cambiando
app.use(express.static(path.join(__dirname,"../client/index.html")));

app.use(cors());//permitir el intercambio de recursos entre origenes cors
//inicializa una primera ruta
app.get("/", function (req, res) {//definir una ruta para la url que envea el archivo index.html
	//res.status(200).sendFile("index.html");
	//útilizamos path
	path.resolve(__dirname,"..","client","index.html");
});

//aca mandamos los datos de nuestra compra a una peticion y crea una preferencia
app.post("/create_preference", (req, res) => {//definir una ruta para crear una preferencia de pago

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			},
		],
		back_urls: {//cuando la compra se realiza con exito redirige al servidor
			"success": "http://localhost:8080",//pagina principal
			"failure": "http://localhost:8080",//si falla vuelvo a la pagina principal
			"pending": ""//No lo usamos si esta pendiente
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({//Nos devuelve una repuesta en forma de json
				id: response.body.id
			});
		}).catch(function (error) {//Manejo de errores
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {//definir una ruta para manejar los comentarios del procesamiento de pagos
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {//Escucha el servidor en el puerto 8080
	console.log("The server is now running on Port 8080");
});