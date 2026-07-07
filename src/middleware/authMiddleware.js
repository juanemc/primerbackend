const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if(!authHeader) {
        return  res.status(401).json({ error: "Token no autorizado"})
    }

    const token = authHeader.split(" ")[1]

    if(!token) {
        return res.status(401).json({ error: "Token Invalido"})
    }
    
    jwt.verify(token, SECRET, (error, decode) => {
        if(error){
            return res.status(403).json({ error: "Token invalido o expirado "})  
        }

        req.usuario = decode //Aqui estamos decodificando los datos del token

        next()
    })
}

module.exports = {
    verificarToken,
    SECRET
}