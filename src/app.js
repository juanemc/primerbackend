require('dotenv').config() //cargando el modulo que nos va a permitir guardar en variables de entorno 

const express = require('express')
const app = express()
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const ratelimit = require('express-rate-limit')

PORT = process.env.PORT || 3000

const limiter = ratelimit({
    windowMs: 1 * 60 * 1000, // 15 minutes window
    max: 5, // Limit each IP to 100 requests per window
    message: 'Has excedido el limite de peticiones ',
})

const peliculasRouter = require('./routes/peliculas') //Aqui lo estamos importando el modulo 
const authRouter = require('./routes/auth') //Aqui lo estamos importando el modulo 


app.use(express.json()) //Middleware esta linea es los req /res que nos envian en formato json el los parsea a objeto js
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(limiter)

app.use('/', peliculasRouter) // en esta linea lq estamos diciendoa  express (app) que utilice las rutas que definimos en el archivo pelicula, en ese archivo la definimos y aqui la estamos usando 
app.use('/auth', authRouter) // prefijo

app.listen(PORT, () => {//Aqui es Donde asignmaos el puerto que queremos que se ejecute el servidor 
    console.log('listening to port http://localhost:' + PORT)
})