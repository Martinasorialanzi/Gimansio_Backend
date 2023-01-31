const mongoose = require ("mongoose")

// creo un modelo que va a estar relacionado con un formulario como el de registro y login
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    lastname: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    // role: {
    //     type: String,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User= mongoose.model('User', userSchema)
module.exports = User;