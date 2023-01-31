const router= require('express').Router()

const { registerUsuario }= require (`../controllers/usuarioController`)


// router.get("/products", getAllProducts)

// router.get("/products/:id",getProduct)

router.post("/usuarioss",registerUsuario)

// router.put ("/product/:id", updateProduct)

// router.delete("/product/:id", deleteProduct)

module.exports=router;