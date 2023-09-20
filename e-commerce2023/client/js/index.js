const shopContent = document.getElementById('shopContent');
const cart = [];//Este es nuestro carrito

productos.forEach((product) =>{
    //Creamos un elemento
    const content = document.createElement("div");
    content.innerHTML = `   
    <img src=" ${product.img}">
    <h3>${product.productName}</h3>
    <p>${product.price} </p>
    `;
    shopContent.append(content);

    //Generamos un boton para cada producto
    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    //lo aderimos al content donde tenemos el div
    content.append(buyButton);

    //evento addEventListener 
    buyButton.addEventListener("click", () =>{
        //variable para saber si el producto esta en el carrito
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id); // devuelve tru o false

        if (repeat){
            //recorer el carrito y dectectar el producto con el mismo id
            cart.map((prod)=>{
                if(prod.id === product.id){
                    prod.quanty++; //sumamos uno al quanty si ya se encontro el mismo producto
                    displayCartCounter();
                }
            })
        }else{
            cart.push({
                id: product.id,
                product: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            displayCartCounter();
        }
    });

});