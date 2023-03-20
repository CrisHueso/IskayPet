/***
 * Documento donde defino las rutas de la API
 */

// definimos express
const express = require("express");

// para podeer modularizar las rutas
const router = express.Router();

// importamos el controlador
const petsCtrllr = require("../controllers/petsController")

/**
 * @swagger
 * tags:
 *  name: Pets
 *  description: Pets endpoint
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - race
 *         - gender
 *         - date_birth
 *         - spcecie
 *       properties:
 *         name:
 *           type: string
 *         race:
 *           type: string
 *         gender:
 *           type: string
 *         date_birth:
 *           type: string
 *         spcecie:
 *           type: string
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: ruta raiz
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Devuelve un texto
 *       400:
 *         description: Error
 */
router.get("/",(req, res) => {
    // ruta principal, devuelve un texto
    res.send("<h1>Prueba API para IskayPet por Cristina Hueso Corpas</h1>");
});

/**
 * @swagger
 * /pets:
 *  get:
 *    summary: endpoint que devuelve un listado de todas las mascotas
 *    tags: [Pets]
 *    responses:
 *      200:
 *        description: endpoint que devuelve un listado de todas las mascotas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Pet'
 */
router.get("/pets", petsCtrllr.get_all_pets);

/**
 * @swagger
 * /pets:
 *  post:
 *    summary: endpoint que crea una mascota, crea un nuevo registro en la tabla
 *    tags: [Pets]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pet'
 *    responses:
 *      200:
 *        description: endpoint que crea una mascota, crea un nuevo registro en la tabla
 */
router.post ("/pets", petsCtrllr.post_create_pet);

/**
 * @swagger
 * /pets/most_numerous_species:
 *  get:
 *    summary: endpoint que la especie que tiene más registros en la tabla de mascotas
 *    tags: [Pets]
 *    responses:
 *      200:
 *        description: endpoint que la especie que tiene más registros en la tabla de mascotas
 */
router.get("/pets/most_numerous_species", petsCtrllr.get_most_numerous_species);

/**
 * @swagger
 * /pets/:id:
 *   get:
 *     summary: endpoint que devuelve la informacion guardadda de una mascota
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet id
 *     responses:
 *       200:
 *         description: The pet info by id
 *       400:
 *         description: The pet was not found
 */
router.get("/pets/:id", petsCtrllr.get_pet_by_id);

/**
 * @swagger
 * /pets/species/average_age/:specie_name:
 *  get:
 *    summary: endpoint que devuelve la edad promedio de una especie determinada y también devuelve la desviación estandar entre las edades de las mascotas de esa especie
 *    tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: specie_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet specie
 *    responses:
 *      200:
 *        description: endpoint que devuelve la edad promedio de una especie determinada y también devuelve la desviación estandar entre las edades de las mascotas de esa especie
 *       400:
 *         description: Error
 */
router.get("/pets/species/average_age/:specie_name", petsCtrllr.get_average_age);  

// exporto el modulo
module.exports = router;