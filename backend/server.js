const express = require('express');
const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.get("/", (req, res)=>{
    res.send("Hola mundo");
})

app.listen(8080, ()=> console.log("Server iniciado"));