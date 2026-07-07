const express = require('express')
const app = express()

const peliculasRouter = require('./routes/peliculas') //Aqui lo estamos importando el modulo 
const authRouter = require('./routes/auth') //Aqui lo estamos importando el modulo 

app.use(express.json()) //Middleware esta linea es los req /res que nos envian en formato json el los parsea a objeto js

app.use('/', peliculasRouter) // en esta linea lq estamos diciendoa  express (app) que utilice las rutas que definimos en el archivo pelicula, en ese archivo la definimos
//y aqui la estamos usando 
app.use('/', authRouter)

app.listen(3000, () => {//Aqui es Donde asignmaos el puerto que queremos que se ejecute el servidor 
    console.log('listening to port http://localhost:3000')
})