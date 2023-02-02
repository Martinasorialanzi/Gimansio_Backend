//aca hacemos toda la configuracion del servidor, (de express)


const bodyParser = require("body-parser"); //OK
const express= require(`express`) //con esta libreria lo que hacemos es manejar todo lo que es hacer un servidor //OK
const productRoutes= require(`./routes/productRoutes`)
const routesUsuario = require('./routes/usuario')//OK
const routesPlanes = require('./routes/planes')//OK
const app=express(); //OK


// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration


app.use(bodyParser.urlencoded({extended:'true'})) //esto lo que hace es parsear todas las respuestas que tenemos
app.use(bodyParser.json()); //y si llega a venir una respuesta en JSON la vamos a parsear de esta manera



app.use(`/v1`,productRoutes)  //poner nombre de la version de la api entonces el quedearia http://localhost:8080/v1/productos
app.use(`/v1`,userRoutes)

app.use(`/v1`, routesUsuario)  //poner nombre de la version de la api entonces el quedearia http://localhost:8080/v1/productos
app.use(`/v1`, routesPlanes)


module.exports=app;




