const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./src/routes'));


app.listen(8080, ()=> console.log("Server iniciado"));