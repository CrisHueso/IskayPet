/***
 * Documento donde defino los servicios de la API
 */

// importo sqlite 3 para poder trabajar con la bbdd
const sqlite3 = require('sqlite3').verbose();

// importo la bbdd
var db = new sqlite3.Database('./iskaypet.db');

// funcion que devuelve un listado de las mascotas
const get_all_pets = () => {
    return new Promise((resolve, reject) => {
        console.log('llega al servicio get /pets'); 
        db.serialize(function() {
            db.all("SELECT * FROM pets", [], async (err, rows) => {
                if (err) return console.error(err)
                rows.forEach((row) => {
                    // console.log(row.id + ": " + row.name + ' ' + row.race + ' ' + row.gender + ' ' + row.date_birth + ' ' + row.specie);
                    var aux = {
                        'id': row.id,
                        'name': row.name,
                        'race': row.race,
                        'gender': row.gender,
                        'date_birth': row.date_birth,
                        'specie': row.specie
                    }
                    console.log('aux', aux)
                })
                resolve(rows);
            });
        });
    });
}

// funcion que crea la mascota, añade un registro a la tabla
const post_create_pet = async (data,res) => {  
    console.log('llega al servicio post /pets'); 
    console.log('data: ',data);
    db.serialize(function() {
        sql = "INSERT INTO pets VALUES(NULL,?,?,?,?,?)"
        db.run(sql,[ data.name, data.race, data.gender, data.date_birth, data.specie], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err})
            console.log('creado nuevo registro');
            return res.json({
                status: 200,
                success: true
            });
        });
    });
    db.each("SELECT * FROM pets", function(err, row) {
        if (row != undefined)
            console.log(row.id + ": " + row.name + ' ' + row.race + ' ' + row.gender + ' ' + row.date_birth + ' ' + row.specie);
    });
}

// funcion que recibe el id de la mascota a buscar, devuelve la informacion de la mascota solicitada
const get_pet_by_id = async (id_to_search,res) => {  
    console.log('llega al servicio get /pets/:id'); 
    console.log('id_to_search',id_to_search); 
    db.serialize(function() {
        // Query data from the table
        db.each("SELECT * FROM pets WHERE id = " + id_to_search, function(err, row) {
            if (row != undefined)
                console.log('row',row);
                 return res.json({
                     status: 200,
                     success: true,
                     data: row
                 });     
        });
    });
}

// funcion que devuelve la especie con más registros en la tabla
const get_most_numerous_species = () => {  
    return new Promise((resolve, reject) => {
        console.log('llega al servicio get /most_numerous_species'); 
        db.serialize(function() {
            // Query data from the table
            db.each("SELECT MAX(specie) as specie FROM pets", function(err, row) {
                if (row != undefined)
                    // console.log('row',row);
                    console.log('specie',row.specie);
                    resolve(row.specie);
            });
        });
    });
}

// funcion que devuelve la edad promedio de una especie determinada y también devuelve la desviación estandar entre las edades de las mascotas de esa especie
const get_average_age = (specie_to_compare, res) => {  
    return new Promise((resolve, reject) => {
        console.log('llega al servicio get /get_average_age'); 
        console.log('specie_to_compare',specie_to_compare);
        db.serialize(function() {
            // Query data from the table
            db.all("SELECT * FROM pets WHERE specie= '" + specie_to_compare + "'", function(err, rows) {
                if (rows != undefined)
                    // console.log('rows',rows);
                    average_age = 0
                    standard_deviation = 0

                    // calcular edad promedio de una especie determinada
                    var age_pets = []

                    // primero calcular la edad por la fecha
                    rows.forEach(pet => {
                        var age = calculate_age(pet.date_birth)
                        console.log(pet.date_birth +  ' - ' + age)
                        age_pets.push(age)
                    });
                    console.log('age_pets', age_pets)

                    // calculamos el promedio
                    sumTotal = 0
                    age_pets.forEach(age => sumTotal = sumTotal + age)
                    average_age = sumTotal / age_pets.length
                    console.log('average_age', average_age)                    
                    
                    //calcular desviacion estantar entre las edades de las mascotas de esa especie
                    standard_deviation = calculate_deviation(age_pets)

                    result = {
                        "average_age": average_age,
                        "standard_deviation": standard_deviation
                    }

                    return res.json({
                        status: 200,
                        success: true,
                        data: result
                    });     
            });
        });
    });
}

// funcion que calcula la edad a partir de la fecha de nacimiento que recibe
function calculate_age(date_birth) {
    // variable donde guardo la fecha formateada de string a date
    var date_birth_pet = new Date(date_birth)

    // separo en variables el año, mes y dia de la fecha de nacimiento
    var anio = date_birth_pet.getFullYear()
    var month = date_birth_pet.getMonth()
    var date = date_birth_pet.getDay()

    // variable donde guardo la fecha de hoy
    var today = new Date();

    //Resto los años
    anio = today.getFullYear() - anio;

    // Si no ha llegado su cumpleaños le resto el año por cumplir
    if (month > (today.getMonth()) || date > today.getDay())
        anio--;
    return anio;
}

// funcion que devuelve la desviación de un array de numeros, recibe dicho array
function calculate_deviation(arr){
    // Creo la media con Array.reduce
    let mean = arr.reduce((acc, curr)=>{
      return acc + curr
    }, 0) / arr.length;
     
    // Calculo el cuadrado de la distancia a la media para cada dato
    arr = arr.map((k)=>{
      return (k - mean) ** 2
    })
     
    // Sumo los valores que resultaron del paso anterior
   let sum = arr.reduce((acc, curr)=> acc + curr, 0);
    
   // Divido entre el número de datos
   let variance = sum / arr.length
    
   // Devolver la desviación
   return Math.sqrt(sum / arr.length)
}

// exporto el modulo
module.exports = {
    get_all_pets,
    post_create_pet,
    get_pet_by_id,
    get_most_numerous_species,
    get_average_age
};