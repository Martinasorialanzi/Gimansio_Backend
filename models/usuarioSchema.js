const mongoose= require (`mongoose`)


const usuarioSchema= new mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },

    lastname:{
        type: String,
        required: true
        
    },
    email:{
        type: String,
        required: true
        
    },
    password:{
        type: String,
        required: true
        
    },
    id:{
        type: Number,
        required: true
        
    },
      createdAt:{
        type: Date,
        default: Date.now
        
    }

})


const Usuario=mongoose.model(`Usuario`,usuarioSchema)
module.exports = Usuario;