const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb+srv://" + process.env.USERDB + ":" + process.env.PASSDB + "@anydirec-buuch.mongodb.net/<dbname>?retryWrites=true&w=majority",()=>{
    console.log("Base de datos conectada");
});


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./src/routes'));


let server = app.listen(8080, ()=> console.log("Server iniciado"));

module.exports = server; 