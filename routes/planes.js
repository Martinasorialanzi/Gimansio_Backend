const { Router } = require('express');
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaPlan = new schema({
    codigoPlan: String,
    idPlan: String,
    nombrePlan: String,
    description: String,
    precio: String
})

const ModeloPlan = mongoose.model('plan', schemaPlan);
module.exports = router;


router.post('/agregarplan', (req, res) => {
    const nuevoPlan = new ModeloPlan({
        codigoPlan: req.body.codigoPlan,
        idPlan: req.body.idPlan,
        nombrePlan: req.body.nombrePlan,
        description: req.body.description,
        precio: req.body.precio
    })
    nuevoPlan.save(function (err) {
        if (!err) {
            res.send('Plan agregado correctamente')
        } else {
            res.send(err)
        }
    })
})

//LLAMADA PARA OBTENER LA LISTA DE USUARIOS
router.get('/obtenerlistadeplanes', (req, res) => {
    ModeloPlan.find({}, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//LLAMADA PARA TRAER LISTA DE PLANES Y PODER EDITAR
router.post('/obtenerdataplan', (req, res) => {
    ModeloPlan.find({ codigoPlan: req.body.codigoPlan }, function (docs, err) {
        if (!err) {
            res.send(docs)
        } else {
            res.send(err)
        }
    })
})

//ACTUALIZAR PLAN
router.post('/actualizarplan', (req, res) => {
    ModeloPlan.findOneAndUpdate({ codigoPlan: req.body.codigoPlan }, {
        codigoPlan: req.body.codigoPlan,
        idPlan: req.body.idPlan,
        nombrePlan: req.body.nombrePlan,
        description: req.body.description,
        precio: req.body.precio

    }, (err) => {
        if (!err) {
            res.send('Plan Actualizado correctamente')
        } else {
            res.send(err)
        }
    })
})


//BORRAR USUARIO
router.post('/borrarPlan', (req, res) => {
    ModeloPlan.findOneAndDelete({ codigoPlan: req.body.codigoPlan },
        (err) => {
            if (!err) {
                res.send('Plan eliminado correctamente')
            } else {
                res.send(err)
            }
        })
})
