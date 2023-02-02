const { Router } = require('express');
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaUsuario = new schema({
    idUsuario: String,
    nombre: String,
    edad: String,
    correo: String,
    celular: String,
    plan: String,
})

const ModeloUsuario = mongoose.model('usuario', schemaUsuario);
module.exports = router;

// Rutade prueba
// router.get('/ejemplo', (req, res) => {
//     res.end('Saludo carga desde ruta ejemplo')
// })

router.post('/agregarusuario', (req, res) => {
    const nuevoUsuario = new ModeloUsuario({
        idUsuario: req.body.idUsuario,
        nombre: req.body.nombre,
        edad: req.body.edad,
        correo: req.body.correo,
        celular: req.body.celular,
        plan: req.body.plan
    })
    nuevoUsuario.save(function (err) {
        if (!err) {
            res.send('Usuario agregado correctamente')
        } else {
            res.send(err)
        }
    })
})


//LLAMADA PARA OBTENER LA LISTA DE USUARIOS
router.get('/obtenerlistadeusuarios', (req, res) => {
    ModeloUsuario.find({}, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//LLAMADA PARA TRAER LISTA DE USUARIOS Y PODER EDITAR
router.post('/obtenerdatausuario', (req, res) => {
    ModeloUsuario.find({ idUsuario: req.body.idUsuario }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//ACTUALIZAR USUARIO
router.post('/actualizarusuario', (req, res) => {
    ModeloUsuario.findOneAndUpdate({ idUsuario: req.body.idUsuario }, {
        idUsuario: req.body.idUsuario,
        nombre: req.body.nombre,
        edad: req.body.edad,
        correo: req.body.correo,
        celular: req.body.celular,
        plan: req.body.plan

    }, (err) => {
        if (!err) {
            res.send('Usuario Actualizado correctamente')
        } else {
            res.send(err)
        }
    })
})


//BORRAR USUARIO
router.post('/borrarusuario', (req, res) => {
    ModeloUsuario.findOneAndDelete({ idUsuario: req.body.idUsuario },
        (err) => {
            if (!err) {
                res.send('Usuario eliminado correctamente')
            } else {
                res.send(err)
            }
        })
})