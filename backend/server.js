const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const producto = require('./src/producto');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(bodyParser.json());
app.get("/", (req, res)=>{
    res.send("Hola mundo");
})

app.post("/producto", (req, res, next)=>{
    //const ProductoModel = mongoose.model('producto');
    producto.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
})

app.listen(8080, ()=> console.log("Server iniciado"));