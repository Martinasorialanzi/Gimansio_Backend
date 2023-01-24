//definimos los endpoits d elos porductos

const router= require('express').Router()

const { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct}= require (`../controllers/productController`)
const upload = require('../library/storage')

router.get("/products", getAllProducts)

router.get("/products/:id",getProduct)

router.post("/products",upload.single('urlImagen'),addProduct)

router.put ("/product/:id", updateProduct)

router.delete("/product/:id", deleteProduct)

module.exports=router;

