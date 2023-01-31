const mongoose= require (`mongoose`)
const {appConfig}=require(`../config`)

const admSchema= new mongoose.Schema({
    
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

      createdAt:{
        type: Date,
        default: Date.now
        
    },
   
})


const Adm =mongoose.model(`Adm`,admSchema)
module.exports = Adm;