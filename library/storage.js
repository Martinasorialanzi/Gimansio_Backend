//aca configuro multer

const multer=require(`multer`)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,`./storage/imagesProducts`) //aca pongo donde quiero que se guarde las imagenes
    },
    filename:(req,file,cb)=>{
        cb(null, `${file.fieldname}-${Date.now()}.png`) //de le pone un nombre a la imagen
    }

});

const upload=multer({storage}); 

module.exports=upload