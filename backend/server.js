const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');
const producto = require('./src/producto');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res)=>{
    res.send("Hola mundo");
})

app.post("/producto", (req, res, next)=>{
    producto.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
})

app.put("/producto/:id", (req, res, next)=>{
    producto.findByIdAndUpdate(req.params.id, req.body, function (err, producto) {
        if (err) return next(err);
        res.json(producto);
    })
})

app.get("/producto/:nombre", (req, res, next)=>{
    nom = req.params.nombre;
    producto.find({"nombre":{ $regex: '(?i).*' + nom + '.*(?-i)' }},function(err, producto) {
        if(err){
            return next(err)
        }
        else{
            res.json(producto)
        }
    })
})

app.get("/productos", (req, res, next)=>{
    producto.find( function (err, productos) {
        if (err) return next(err);
        res.json(productos);
    })
})

app.listen(8080, ()=> console.log("Server iniciado"));