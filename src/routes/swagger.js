// importo Swagger
const swaggerUi = require('swagger-ui-express');
// definimos el documento Swagger
const swaggerJsDoc = require('swagger-jsdoc');
// constante para las rutas
const path = require("path");
// definimos el titulo la url dle servidor y las rutas de las apis
const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Prueba API IskayPet por Cristina Hueso Corpas',
            version: "1.0.0"
        },
        servers: [{
            url:"http://localhos:3000"
        }]
    },
    apis: [`${path.join(__dirname, "/routes/index.js")}`]
};

// Docs en JSON format
const swaggerSpec = swaggerJsDoc(option)

// Funcion to setup our Docs
const swaggerDocs = (app, port) =>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use('/api-docs.json', (req, res) =>{
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log(`Document Server on port http://localhost:${port}/api-docs/`)
}

module.exports = {
    swaggerDocs
}