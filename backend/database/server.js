const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(process.env.CONNECTIONMONGODB,()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(`${__dirname}/src/storage/imgs`))
app.use(require('./src/routes'));


let server = app.listen(process.env.PORT || 8080, ()=> console.log("Server iniciado"));

module.exports = server; 