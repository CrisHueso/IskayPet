// importamos los servicios
const petsServices = require('../services/petsServices') 

// funcion para devolver el listado de las mascotas
const get_all_pets = async (req, res) => {
    try {        
        console.log('llega al endpoints get /pets'); 
        const all_pets = await petsServices.get_all_pets()
        console.log('all_pets', all_pets)
        return res.json({
            status: 200,
            success: true,
            data: all_pets
        });
    } catch (error) {
        console.error(error)
        return res.json({
            status: 400,
            success: false
        })
    }
}

// funcion para crear una mas cota y añadirla a la bbdd
const post_create_pet = async (req, res) => {
    try {
        console.log('llega al endpoints post /pets'); 
        console.log('body: ',req.body);
        const data = req.body;
        await petsServices.post_create_pet(data,res)
    } catch (error) {
        console.error(error)
        return res.json({
            status: 400,
            success: false
        })
    }
}

// funcion para devolver la info de una mascota segun su id
const get_pet_by_id = async (req, res) => {
    try {
        console.log('llega al endpoints get /pets:id'); 
        console.log('params',req.params); 
        result = ''
        const {id} = req.params
        await petsServices.get_pet_by_id(id,res)
    } catch (error) {
        console.error(error)
        return res.json({
            status: 400,
            success: false
        })
    }
}

// funcion obtener la especie con más registros
const get_most_numerous_species = async (req, res) => { 
    try {
        console.log('llega al endpoints get /most_numerous_species');
        const most_numerous_species = await petsServices.get_most_numerous_species()
        console.log('most_numerous_species: ', most_numerous_species)
        return res.json({
            status: 200,
            success: true,
            data: most_numerous_species
        });
    } catch (error) {
        console.error(error)
        return res.json({
            status: 400,
            success: false
        })
    }
}

// funcion que devuelve la edad promedio de una especie determinada y también devuelve la desviación estandar entre las edades de las mascotas de esa especie
const get_average_age = async (req, res) => {
    try {
        console.log('llega al endpoints get /average_age');
        console.log('params',req.params);
        const {specie_name} = req.params
        const average_age = await petsServices.get_average_age(specie_name, res)
        console.log('average_age: ', average_age)
        return res.json({
            status: 200,
            success: true,
            data: average_age
        });
    } catch (error) {
        console.error(error)
        return res.json({
            status: 400,
            success: false
        })
    }
}

// exporto el modulo
module.exports = {
    get_all_pets,
    post_create_pet,
    get_pet_by_id,
    get_most_numerous_species,
    get_average_age
};