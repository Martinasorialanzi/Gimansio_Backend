const bcryptjs = require('bcryptjs')
require('dotenv').config()

// encriptamos la contraseña para  qse guarde asi en la base de datos
const encryptPassword = async (password) => {
    // se pone hasta 10, q es la longitud maxima de la contraseña encriptada
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)
    return hash
}

const comparePassword = (password, hash) => {
    // comparo la contraseña q ingresa el ususario con la encriptada para q sean consideradas como iguales
    // poner el sync al lado del compare es lo mismo q hacer la funcion asyncronica
    const result = bcryptjs.compareSync(password, hash)
    return result
}

module.exports = {encryptPassword, comparePassword}