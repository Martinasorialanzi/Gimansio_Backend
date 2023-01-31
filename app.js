//aca hacemos toda la configuracion del servidor, (de express)

const bodyParser = require("body-parser");
const express= require(`express`) //con esta libreria lo que hacemos es manejar todo lo que es hacer un servidor
// const productRoutes= require(`./routes/productRoutes`)
const userRoutes = require ('./routes/userRoutes')
const app=express();


app.use(bodyParser.urlencoded({extended:false})) //esto lo que hace es parsear todas las respuestas que tenemos
app.use(bodyParser.json()); //y si llega a venir una respuesta en JSON la vamos a parsear de esta manera


// app.use(`/v1`,productRoutes)  //poner nombre de la version de la api entonces el quedearia http://localhost:8080/v1/productos
app.use(`/v1`,userRoutes)

module.exports=app;




