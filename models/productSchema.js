const mongoose= require (`mongoose`)
const {appConfig}=require(`../config`)

const productSchema= new mongoose.Schema({
    
    nombre:{
        type: String,
        required: true
    },

    categoria:{
        type: Array,
        required: true
        
    },

    precio:{
        type: Number,
        required: true
        
    },

    id:{
        type: Number,
        required: true
        
    },

    urlImagen:{
        type: String,
        required: false
        
    },

    descripcion:{
        type: String,
        required: true
        
    },

    portada:{
        type: Boolean,
        required: true
        
    },

    talle:{
        type: Array,
        required: false
        
    },

    color:{
        type: Array,
        required: false
        
    },

    stock:{
        type: Number,
        required: false
        
    },


      createdAt:{
        type: Date,
        default: Date.now
        
    }

})

productSchema.methods.setImgUrl=function setImgUrl(filename){ //hago un metodo es decir una funcion para cargar las imagenes y hay que traer el app config para armar la rl con el puerto y el host
        const {host,port}=appConfig;
        this.urlImagen=`${host}:${port}/public/${filename}` //haciendo referencia urlImagene(this) le seteamos el url. se pone el public porque eso es lo que ve el usuario
}

const Product=mongoose.model(`Product`,productSchema)
module.exports = Product;
