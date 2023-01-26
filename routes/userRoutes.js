// tengo que poner todas las funciones q hice en el user controler para hacerlas funcionar y que se puedan consumir desde el front
// primero desde express traigo la funcion routes e importo las funciones de nuestro controller.

const router = require('express').Router();
const { getAllusers, getUser, registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');


// pongo primero el path y luego la funcion q quiero llamar
router.get("/users", getAllusers);
router.get("/users/:id", getUser);
router.post("/user/register", registerUser); //el post crea, por eso pongo post en el registro
router.post("/user/login", loginUser);//estoy haciendo un login, por eso post
router.put("/user/:id", updateUser);//el put actualiza
router.delete("/user/:id", deleteUser);

module.exports = router;
