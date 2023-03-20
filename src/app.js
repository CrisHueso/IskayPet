/***
 * Documento principal que ejecuta la aplicacion
 */

// importo express
const express = require('express');

// importo
const bodyParser = require('body-parser');

// importo las rutas que hemos definido
const router = require("./routes/index");

// fichero donde cremos las tablas y los registros
const tables = require("./tables");

// importo Swagger
const swaggerUI = require('swagger-ui-express');
// definimos el documento Swagger
const swaggerJsDoc = require('swagger-jsdoc');
// constante para las rutas
const path = require("path");

// defino el puerto, la leemos de la variable de entorno si no ponemos el 3000
const PORT = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Prueba API IskayPet por Cristina Hueso Corpas',
            version: "1.0.0",
			description: "A simple Express Library API"
        },
        servers: [{
            url:"http://localhos:" + PORT
        }]
    },
    apis: [`${path.join(__dirname, "/routes/*.js")}`]
};

// importo el swagger
const specs = swaggerJsDoc(options);

// defino la aplicacion
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// el servidor se queda escuchado y muestra log
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

// defino los endpoints que voy a usar 
app.get("/", router);
app.get("/pets", router);
app.post("/pets", router);
app.get("/pets/most_numerous_species", router);
app.get("/pets/:id", router);
app.get("/pets/species/average_age/:specie_name", router);
