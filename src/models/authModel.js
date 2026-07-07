const db = require('../db')

const buscarusuario = (username, callback) => {
    const sql = "SELECT * FROM usuarios where username = ?"

    db.query(sql,[username], callback)
}

const crearusuario = (username, passwordhash, callback) => {
    const sql = "INSERT INTO usuarios (username, password) VALUES (?, ?) "

    db.query(sql,[username, passwordhash], callback)
}


module.exports = {
    buscarusuario,
    crearusuario
};