const db = require("../db") // aqui estamos guardadno el objeto connection en esa variable llamada db
//Recordemos que el objeto connection es lo que nos permitio conectra en la base de datos esa ruta que esta entre parentesis


// Obtener todas las peliculas
const obtenerpelicula = (callback) => {
    const sql = "SELECT * FROM pelicula"

    db.query(sql, callback)
//query es una funcion del objeto connection de mysql y a esta funcion le pasamos un string con el query que voy a
// ejecutar en la base de datos y un callback que es opcional que es lo que el va a hacer con ese query 

//Esa funcion es propia de ese modulo que instalamos de mysql2
}

// Crear Peliculas
const crearPelicula = (pelicula, callback) => {
    const sql = "INSERT INTO pelicula(nombre, director, ano_lanzamiento) VALUES (?, ?, ?)"

    db.query(
        sql,
        [pelicula.nombre, pelicula.director, pelicula.ano_lanzamiento],
        callback
    )
}

//Actualizar Pelicula
const actualizarPelicula = (id, pelicula, callback) => {
    const sql = "UPDATE pelicula SET nombre = ?, director = ?, ano_lanzamiento = ? WHERE id = ?"

    db.query(
        sql, 
        [pelicula.nombre, pelicula.director, pelicula.ano_lanzamiento, id],
        callback
    )
}

//Eliminar Pelicula 

const eliminarPelicula = (id, callback) => {
    const sql = "DELETE FROM pelicula WHERE id = ?"

    db.query(sql, [id], callback)
}


module.exports = {
    obtenerpelicula,
    actualizarPelicula,
    eliminarPelicula,
    crearPelicula
}