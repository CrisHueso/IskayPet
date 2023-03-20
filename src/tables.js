/***
 * Documento donde definimos la tabla y añadimos registros
 */

// importo sqlite3
const sqlite3 = require('sqlite3').verbose();

// variable donde definimos la bbdd
var db = new sqlite3.Database('./iskaypet.db');

// ejecuto codigo SQL
db.serialize(function() {
   // compruebo si la tabla existe y la borramos en caso en que exista
   sql = "DROP TABLE IF EXISTS pets"
   db.run(sql);

   // creo la tabla y definimos la clave primaria y el resto de parametros
   sql = "CREATE TABLE pets(id INTEGER PRIMARY KEY AUTOINCREMENT, name text not null, race text not null, gender text not null, date_birth date not null, specie text not null)"
   db.run(sql);

   // inserto datos en la tabla
   sql = "INSERT INTO pets VALUES(0,'Lucy', 'mestizo', 'female', '2021-03-07', 'cat')"
   db.run(sql);
   sql = "INSERT INTO pets VALUES(1,'Chesire', 'mestizo', 'male', '2021-05-07', 'cat')"
   db.run(sql);
   sql = "INSERT INTO pets VALUES(2,'Gato', 'mestizo', 'female', '2020-09-07', 'cat')"
   db.run(sql);
   sql = "INSERT INTO pets VALUES(3,'Luna', 'negro', 'male', '2020-03-07', 'dog')"
   db.run(sql);
   sql = "INSERT INTO pets VALUES(4,'bob', 'azul ruso', 'male', '2019-03-07', 'dog')"
   db.run(sql);
   sql = "INSERT INTO pets VALUES(5,'piolin', 'mestizo', 'male', '2001-03-07', 'bird')"
   db.run(sql);

   // hago una consulta a la tabla para ver sotod los registros introducidos
   db.each("SELECT * FROM pets", function(err, row) {
       console.log(row.id + ": " + row.name + ' ' + row.race + ' ' + row.gender + ' ' + row.date_birth + ' ' + row.specie);
   });
});