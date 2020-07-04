const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');
//Esta librería me deja leer las variables de entorno en .env
require('dotenv').config();

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://fede9612:fedekpo96@anydirec-buuch.mongodb.net/<dbname>?retryWrites=true&w=majority",(err, res)=>{
  if (err) {
    console.log ('ERROR al conectar:', err);
    } else {
    console.log ('Succeeded connected to:' ,process.env.CONNECTIONMONGODB);
    }
});

const app = express();
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods: GET");
//     next();
//   });
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(`${__dirname}/src/storage/imgs`))
app.use(require('./src/routes'));


let server = app.listen(process.env.PORT || 8080, ()=> console.log("Server iniciado", process.env.PORT));

module.exports = server; 