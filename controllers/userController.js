// aqui nos vamos a traer los usuarios de la base de datos, vamos a controlarlos, validarlos, controlar login y registro. vamos a usar los metodos htpp


const mongoose = require("mongoose");
// el user es un modelo que cree y exporte en user.schema
const User = require("../models/userSchema");
// traigo las funciones para encriptar la conraseña
const {encryptPassword, comparePassword} = require("../utils/passwordEncripter")

const { JsonWebTokenError } = require("jsonwebtoken")

// primero nos traemos todos los usuarios desde la base de datos
const getAllusers = async (req, res) => {
  try {
    // primero creo una variable donde guardo todos los datos de usuarios.
    const users = await User.find();
    // dsp verifico que esa variable traiga datos, si da codigo 404 significa q hay un error q no se encontro y pongo un msje de usuario no encontrado
    if (!users) {
      res.status(404).json({
        statusCode: 404,
        message: "Usuario no encotrado",
      });
    }
    // si me da un 22 (exito) mando un json conmsje usuarios encontrados
    res.status(200).jason({
      statusCode: 200,
      message: "Usuarios encontrados",
    });
  } catch (error) {
    // y si hay u  try, hay un catch q es para cuando el codigo de error es 500, es decir q es un error de sistema
    res.status(500).json({
      statusCode: 500,
      message: "Error al buscar usuarios",
      error: error.message,
    });
  }
};
// ya trajismos todos los usuarios, ahora hay que traer un usuario unico para que se pueda loguear

const getUser = async (res, req) => {
    // paso id por parametro
    const {id}= req.params;

    try {
        // primero verificamos q el id coincida con el q esta guardado en la base de datos
        if(!mongoose.inValidObjectId(id)){
            res.status(400).json({
                statusCode: 400,
                message: "id invalido"
            })
        }
// ahora traigo el ususario desde el schema pero verificando q me coincida el id, sino va a pasar como false y me va a dar error
        const user = await User.findById(id);
        // ahora hago lo mismo q hice arriba
        if (!user) {
            res.status(404).json({
              statusCode: 404,
              message: "Usuario no encotrado",
            });
          }
          // si me da un 22 (exito) mando un json conmsje usuarios encontrados
          res.status(200).jason({
            statusCode: 200,
            message: "Usuarios encontrados",
          });
    }
    catch(error){
        res.status(500).json({
            statusCode: 500,
            message: "Error al buscar usuarios",
            error: error.message,
          });
    }


};

// hacemos el registro

const registerUser = async (req,res) => {
    // le paso todos los parametrod q tengo en el user schema
    // el req.body es el formulario de registro, le estoy pidiendo q del formulario de registro me traiga todos los datos q puse por parametro
    const {name, lastname, email, password} = req.body;
    
    // const user = await User ({name, lastname, email, password})
    const secret = process.env.SECRET_KEY
    // de la pag de jwt saco los parametros q tengo q poner en el token
    // con la secret key q definimos genero el token
    // el token sirve para mantener la sesion iniciada mientras se esta en uso, dsp de un tiempo de inactividad se cierra
    // const token = jwt.sign({email:email}, secret, {expiresIn: '1h'})
    try{
        // pregunto si el nuevo usuario es igual a alguno q ya exista en la base de datos
        // if(user) {
        //     res.status(400).json({
        //         statusCode: 400,
        //         message: "Usario ya existe"
        //     });
        // }
        // si el usuario no existe lo creo
        const newUser = new User({
            // pido q me traiga todos los datos del formulario de registro
            ...req.body, 
            name,
            lastname,
            email,
            password,
            // token para confirmar el email
            // confirmacionToken: token,
        });
        // ahora guardo mi nuevo usuario
        const user = await newUser.save();
        res.status(201).send({
            user
        })
    }catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "error al crear el usuario",
            error: error.message,
        })
    }
    
};

// hacemos el login

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        // uso un metodo de js para saber si el ususario existe q se llama findOne
        // verifico q el mail sea el mismo q traje de la base de datos
        const user = await User.findOne({email: email})
        if(!user){
            res.status(404).json({
                statusCode: 404,
                message: "Usuario no encotrado",
        })
        }

        // verifico q el password sea el mismo q de la base de datos (q esta encriptado), por eso uso la funcion de comparar q hice en la encrptacion
        // tengo como parametro el password q ingreso el ususario al formulario de login y el password encriptado q tengo guardado en mi base de datos
        const verificacionPassword = comparePassword(password, user.password); //esto retorna un booleano
        if (!verificacionPass) {
            res.status(401).json({
              statusCode: 401,
              message: "Contraseña incorrecta",
            });
          }
          const secret = process.env.SECRET_KEY;
          const token = jwt.sign({ email: email }, secret, { expiresIn: "1h" });
          res.status(200).json({
            statusCode: 200,
            message: "Usuario logeado",
            token: token,
          });
    }
 
    catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Error al logear usuario",
        error: error.message,
      });
    
}
}

const logout = async (req, res) => {
    try {
        res.status(200).json({
          statusCode: 200,
          message: "Usuario deslogeado",
        });
      } catch (error) {
        res.status(500).json({
          statusCode: 500,
          message: "Error al deslogear usuario",
          error: error.message,
        });
      }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.inValidObjectId(id)) { //primero vemos si el id es valido
        res.status(400).json({
          statusCode: 400,
          message: "Id invalido",
        });
      }
    //   buscamos por id el usuario a editar y traigo los datos para hacer uno nuevo con el mismo mail y d
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Usuario actualizado",
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Error al actualizar usuario",
        error: error.message,
      });
    }
  };
  
  const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      if (!mongoose.inValidObjectId(id)) {
        res.status(400).json({
          statusCode: 400,
          message: "Id invalido",
        });
      }
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          message: "Usuario no encontrado",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Usuario eliminado",
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        message: "Error al eliminar usuario",
        error: error.message,
      });
    }
  };
  
  module.exports = {
    getAllusers,
    getUser,
    registerUser,
    loginUser,
    logout,
    updateUser,
    deleteUser,
  };