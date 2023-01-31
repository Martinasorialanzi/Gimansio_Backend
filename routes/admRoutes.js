const router= require('express').Router()

const { getAllProducts, getProduct, admRegistro, updateProduct, deleteProduct}= require (`../controllers/adm.controller`)


// router.get("/products", getAllProducts)

// router.get("/products/:_id",getProduct)

router.post("/adms",admRegistro)

// router.put ("/product/:_id", updateProduct)

// router.delete("/product/:_id", deleteProduct)

module.exports=router;