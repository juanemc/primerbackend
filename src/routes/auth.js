const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { buscarusuario, crearusuario } = require('../models/authModel')
const { SECRET } = require('../middleware/authMiddleware')


router.post('/register', (req, res) => {
    const { username, password } = req.body

    console.log (req.body) ;

    if (!username || !password) {
        res.status(400).json({ error: "ussername y password requerido " })
    }

    const passwordhash = bcrypt.hashSync(password, 10) // Aqui estamso hasheando/encriptando la contrasena con una longitud de 10

    crearusuario(username, passwordhash, (error, resultado) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {// Este es el error que sale cuando se intenta insertar un valor que debe ser unico 
                return res.status(409).json({ error: "El username debe ser unico " })
            }
            
            return res.status(500).json({ error: "El error creando usuario " })
        }

        res.status(201).json({msg: "Usuario creado Exitosamente "})
    })
})  

router.post('/login', (req, res) => {
     const { username, password } = req.body

    if (!username || !password) {
        res.status(400).json({ error: "ussername y password requerido " })
    }

    buscarusuario(username, (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: "Error en el servidor " })
        }

        if(resultados.length === 0) {
            return res.status(500).json({ error: "Credenciales invalidas" })

        }

        const usuario = resultados[0]

        const passwordvalido = bcrypt.compareSync(password, usuario.password)

        if(!passwordvalido) {
            return res.status(401).json ("Credenciales invalidas")
        }

        const token = jwt.sign( //AQUI ESTAMOS CREANDO EL TOKEN 
            {id : usuario.id, username : usuario.username},
            SECRET,
            {expiresIn : '2h'}
        )

        res.json({token})

    })
})

module.exports =  router
