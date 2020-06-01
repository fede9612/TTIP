const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');
const mails = require('./src/mails');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./src/routes'));

mails.main();
mails.main().catch(console.error);

let server = app.listen(8080, ()=> console.log("Server iniciado"));

module.exports = server; 