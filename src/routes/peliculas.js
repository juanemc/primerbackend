const express = require("express")
const router = express.Router() //Rouder para manejar las rutas, definir mis rutas


const productoModel = require('../models/peliculamodel')
const {verificarToken} = require('../middleware/authMiddleware')

//Metodo Get para Leer
router.get('/peliculas', (req, res) => {

    productoModel.obtenerpelicula((error, resultado) => {

        if (error) {
            res.status(500).send({ error: "Error consultando la base de datos" })
        }
        else {
            res.json(resultado)
        }

    })

})

//Metodo Post para crear 
router.post('/peliculas', verificarToken, (req, res) => {
    const pelicula = req.body

    productoModel.crearPelicula(pelicula, (error, resultado) => {


        if (error) {
            res.status(500).send({ error: "Error a la hiora de crear la pelicula" })
        }
        else {
            pelicula.id = resultado.insertId

            res.status(201).json(pelicula)
        }
    })

})

//Metodo Put para actualizar 
router.put('/peliculas/:id', verificarToken, (req, res) => {
    const id = parseInt(req.params.id)

    const newPelicula = req.body

    productoModel.actualizarPelicula(id, newPelicula, (error, resultado) => {

        if (error) {
            res.status(500).send({ error: "Lo sentimos no se pudo actualizar el producto" })
        }
        else {

            if (resultado.affectedRows === 0) {
                res.status(404).send({ error: "Pelicula no encontrada" })
            } else {
                res.send("Pelicula Actualizada ")
            }

        }
    })

});

//Metodo Delete
router.delete('/peliculas/:id', verificarToken, (req, res) => {
    const id = parseInt(req.params.id)

    productoModel.eliminarPelicula(id, (error, producto) => {

        if (error) {
            res.status(404).send("Pelicula eliminado")
        } 
        else {

            if (resultado.affectedRows === 0) {
                res.status(404).send({ error: "Pelicula no esta en la base de datos" })
            } else {
                res.send("Pelicula Actualizada")
            }

        }
    })
    res.send('eliminado')
})

module.exports = router /// AQui estamos esportando este modulo para que otro archivos puedan usarlo

