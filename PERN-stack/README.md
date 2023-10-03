# Lista de tareas

Proyecto con stack PERN (Postgresql, Express, React, Nodejs), para crear una lista de tareas.

---

## Dependencias 

```
 "dependencies": {
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

- cookie-parser: para manejar las cookies, creadas a traves de los objetos de JavaScript

- cors: permite comunicar le Front y el Back, y tener una configuración donde el Front puede hacer request al servidor

- express: el Framework BackEnd de Nodejs, que nos permite crear le servidor web

- express-promise-router: la forma en que podemos tener distintas rutas y posibilidad de manejar errores

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