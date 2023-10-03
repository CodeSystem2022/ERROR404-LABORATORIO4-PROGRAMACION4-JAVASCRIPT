# Lista de tareas

Proyecto con stack PERN, para crear una lista de tareas.

PERN = Postgresql, Express, React, Nodejs

- Postgresql: base de datos no relacional

- Express: Nodejs web Framework

- React: Front End JavaScrpt Library

- Nodejs: JavaScript runetime enviroment

---

## Al correrlo en local

- `npm i` para instalar node modules

- Ir al archivo **db.js** y fijarse en la configuración, cambiar de ser necesario tanto el user como el **password**, acorde a lo que se tenga localmente configurado. Y recordar que ya figura la basa de datos de nombre **PERN** (chequear que ya este creada localmente)

- Hay que crear la base de datos en postgress local. Desde **PgAdmin**, vamos a **Databases** > **Create** > **Database**. Vamos a la solapa de **general** y en *+database** ponemos le nombre de la base de datos: `PERN` y hacemos click en **Store**.

Ahora si vamos a **Schemas** y buscamos **tables** vemos que no tenemos tablas, entocnes la agregamos con: **Create** >  **Table** ó sino **Create** > **QueryTool** y desde el archivo **init.sql** nos copiamos la query:

```SQL
CREATE TABLE tareas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) UNIQUE NOT NULL,
  descripcion TEXT
)
```

Ahora si refrescamos en **Tables** vamos a ver la nueva tabla **Tareas**, si vamos a **ViewData** > **AllRows** vemos la tabla vacia, pero si vemos que es con esta estructura

| id | titulo | descripcion |
| -- | ------ | ----------- |
| PK integr...  | character varying(255) | text |


Y también debo tneer la tabla de **usuarios**, si no la tengo la puedo crear con:

```SQL
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  name                  VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Dependencias 

```
 "dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "express-promise-router": "^4.1.1",
    "jsonwebtoken": "^9.0.2",
    "md5": "^2.3.0",
    "morgan": "^1.10.0",
    "pg": "^8.11.3",
    "zod": "^3.22.2"
  },
  "devDependencies": {
    "eslint": "^8.50.0",
    "nodemon": "^3.0.1"
  }
```

### Dependencias de producción

- bcrypt, para poder encriptar el password en el registro y creacion de nuevo usuario

- cookie-parser: para manejar las cookies, creadas a traves de los objetos de JavaScript

- cors: permite comunicar le Front y el Back, y tener una configuración donde el Front puede hacer request al servidor

- express: el Framework BackEnd de Nodejs, que nos permite crear le servidor web

- express-promise-router: la forma en que podemos tener distintas rutas y posibilidad de manejar errores, nos evitamos de crear el try-catch

- morgan: es una biblioteca que nos ayuda a ver por consola los request del Front

- pg: permite hacer la conexión con postgress y enviar las consultas sql desde el front al back (servidor)

- jsonwebtoken: para generar un token a traves del BackEnd y enviarselo al Front End

- md5: para generar una imagen en el usuario al registrarse, utilizando Gravatar, lo que va a solicitar un email para generar una imagen, además pide que esté encriptado con el algoritmo md5. Con este servicio vamos a generar el hash necesario.

- zod: biblioteca para relaizar validaciones


### Dependencias de desarrollo

- ESLint: para tener bien formateado el codigo

- nodemoon: para ir viendo en vivo los cambios en el Back

---

## Estructura del proyecto - Back End

```
> database
> node_modules
> src
   > controllers
   > libs
   > middlewares
   > router
   > schemas
   app.js
   config.js
   db.js
   index.js
.gitignore
package-lock.json
package.json
README.md   
```

Entonces la estructura del Back End es:

- **database** con el archivo **init.sql**

- **controllers** es para la logica que se ejecuta al entrar a una determinada ruta

- **config.js** tiene las configuraciones de la aplicación, el usuario y contraseña de la base de datos, el puerto donde se ejecuta el servidor, los token o keys, ets.... es como el archivo **.env**

- **app.js** va a ir todo le codigo express

- **index.js** es solo el archivo de arranque, el archivo init de la aplicación.