##Nodepop - Práctica MEAN para Keepcoding

##Instalacción

Clonamos el repo.

```bash
$ git clone https://github.com/es11400/practika_mean.git
```

##Comandos NPM creados

Para comprobar que el codigo esta verificado con Eslint
```bash
$ npm eslint 
```

Para crear un juego de datos de ejemplo.
```bash
$ npm installDB
```
Este comando creará tantos anuncios como se le indique en numberOfAds en el config.js
 
Descargará las imagenes en /public/images desde la API de UnSplash, esta esta limitada a 50 peticiones por hora, si numberOfAds es superior a 50 o se han realizados mas peticiones de las disponibles en una hora, se añadira a la imagen no-image.png.

Los parámetros configurables son:

    numberOfAds: 25   => El máximo anuncios a crear
    minprice: 1       => minimo precio para ejemplos
    maxprice: 1000.00 => máximo precio para ejemplos

Los parámetros de la API de UnSplash son:

    photoOptions: {
        url: 'https://api.unsplash.com/photos/random',
        w: 220,
        h: 320,
        orientation: 'portrait',
        query: 'cars',
        headers: {
            'Authorization': 'Client-ID AQUI VA LA API KEY DE UNSPLASH'
        }
    }
    
Para iniciar la aplicación

```bash
$ npm start 
```

##Endpoints disponibles

####Usuarios

#####Registro de Uuarios

######POST http://localhost:3000/apiv1/users/signup

Parámetros:

    name : String
    email : String
    password : String

Headers:

    Accept-Language: [es, en]
    Content-Type:   application/x-www-form-urlencoded
    
Si la petición es correcta devolvera success: true y el token de seguridad JWT

    {"success": true, "token": eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODhiZmQ2ZjNmZDBhOGZhYjFlMWE4MTQiLCJpYXQiOjE0ODU2OTY0NjcsImV4cCI6MTQ4NTg2OTI2N30.Ecd7byRBSPAvMaMUgnyuuKaGIQb5aRzMwxepVQW0ku4}

si no es correcta devolverá el success : false y el mensaje de error.

    {"success": false, "message": Token erroneo}

#####Autenticación de Uuarios

######POST http://localhost:3000/apiv1/users/authenticate

Parámetros:

    email : String
    password : String
    
Headers:

    Accept-Language: [es, en]
    Content-Type:   application/x-www-form-urlencoded

    
Si la petición es correcta devolvera success: true y el token de seguridad JWT

####Anuncios

#####Listado de anuncios

######GET http://localhost:3000/apiv1/ad

Requiere autenticación

Se podrá filtrar por los siguientes parametros

Parámetros:

    name   : String
    sale   : String
    price  : Number || Number- || -Number || Number-Number
    tags   : String
    limit  : Number
    start  : Number
    fields : String
    sort   : String
    
    token  : token JWT devuelto por /users/authenticate

Headers:

    Accept-Language: [es, en]

Funcionamiento general de la busqueda por parametros

name : Busca todos los anuncios que comiencen por el texto introducido no case sensitive
sale : true para ventas y false para busquedas
tags : Busca todos los anuncios que partenecen a un determinado tag
price: Busca por un precio exacto o un rango dependiendo del valor introducido:

    número  : Devuelve los anuncios que tengan el precio exacto al introducido (ej. 50)
    -número : Devuelve los anuncios que tengan un precio menor al introducido (ej. -50)
    número- : Devuelve los anuncios que tengan un precio mayor al introducido (ej. 50-)
    número-número : Devuelve los anuncios que tengan un precio en entre los valores introducidos. (ej. 50-80)

Busqueda avanzada:

    limit: Number - Busqueda limitada a X anuncios
    start: Number - La busqueda comienza en el anuncion de posición X
    fields: String - Muestra solo los campos solicitados más el id, si se solicita mas de uno es necesarios separarlos por un espacio. 
    sort: String - Ordena la busqueda por el campo solicitado, para busquedas inversas añadir - al campo (ej. -price)
    
    
Ejemplo de respuesta.
    
    {
      "success": true,
      "data": [
        {
          "_id": "588a6358864090ced8021d8a",
          "name": "Xiaomi miPad",
          "sale": false,
          "price": 508.83,
          "photo": "/images/photo-1455729445033-186172508682.jpg",
          "tags": [
            "work"
          ]
        }
    }


####Tags

#####Listado de tags

######GET http://localhost:3000/apiv1/tags

Requiere autenticación

Headers:

    Accept-Language: [es, en]

La repuesta es:

    {
      "success": true,
      "tags": [
                "work",
                "lifestyle",
                "motor",
                "mobile"
            ]
    }
    
##Internacionalización

Hemos usado el paquete i18n.

Los idiomas son configurables desde el fichero config.js

    languages: ['en', 'es']
Pudiendo añadir los idiomas que se  necesiten, dicho paquete genera en la carpeta /locales los ficheros correspondientes a los idiomas configurados.

./locales/en.js

    {
    	"Not Found": "Not Found",
    	"No encontrado": "No encontrado",
    	"user is not defined": "user is not defined",
    	"err is not defined": "err is not defined",
    	"User is empty": "User is empty",
    	"Cannot read property 'constructor' of undefined": "Cannot read property 'constructor' of undefined",
    	"token is not defined": "token is not defined",
    	"Email is empty": "Email is empty",
    	"Can't set headers after they are sent.": "Can't set headers after they are sent.",
    	"Password is empty": "Password is empty",
    	"": "",
    	"Insert correct email": "Insert correct email",
    	"Password is too short, 8 characters minimun": "Password is too short, 8 characters minimun",
    	"This library (validator.js) validates strings only": "This library (validator.js) validates strings only",
    	"Ooops!!!, something is wrong...": "Ooops!!!, something is wrong...",
    	"Password or email is incorrect": "Password or email is incorrect",
    	"No token provided": "No token provided",
    	"Invalid token": "Invalid token",
    	"No data avaliable": "No data avaliable"
    }
    
./locales/es.js

    {
        "Not Found": "No encontrado",
        "No encontrado": "No encontrado",
        "user is not defined": "El usuario no esta deifinido",
        "err is not defined": "Error no definido",
        "User is empty": "El usuario esta vacío",
        "Cannot read property 'constructor' of undefined": "No puedo leer la propiedad del constructor",
        "token is not defined": "Token no definido",
        "Email is empty": "Email esta vacío",
        "Can't set headers after they are sent.": "No se pueden cambiar las cabeceras despues de ser enviadas",
        "Password is empty": "Password esta vacía",
        "": "",
        "Insert correct email": "Inserte un email correcto",
        "Password is too short, 8 characters minimun": "La contraseña es demasiado corta, mínimo 8 caracteres",
        "This library (validator.js) validates strings only": "La libreria validators.js solo valida cadenas",
        "Ooops!!!, something is wrong...": "Ooops!!!, algo esta mal...",
        "Password or email is incorrect": "Email o contraseña erroneos",
        "No data avaliable": "No hay datos disponibles",
        "No token provided": "No hay enviado el token",
        "Invalid token": "Token erroneo"
    }
    
##Autenticación JWT

Para la autenticación usamos JWT (Json Web Tokens), puediendo configurar en el fichero config.js los siguientes parámetros

    jwt: {
            secret: 'SECRET KEY',
            expiresIn: '2 days'
        }
        
expiresIn esta expresado en segundos o una de las cadenas descritas en [rauchg/ms](https://github.com/rauchg/ms.js). Eg: `60`, `"2 days"`, `"10h"`, `"7d"`