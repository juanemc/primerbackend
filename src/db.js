//Este archivo lo creamos para hacer la coneccion a la base de datos, este es el archivo que nos va a conectar 
const mysql = require("mysql2") // Aqui estamos importando el modulo 

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'peliculas'
}) // aqui nos estamos conectando a la base de datos con este objeto 

connection.connect((error) => {
    if (error) {
        console.log("Erros conectadno a la base de datos")
    } else {
        console.log("Conectado a la base de datos ")
    }
})

module.exports = connection


