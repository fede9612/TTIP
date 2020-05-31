const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');
const accountSid = 'AC4bbaef748e471bfc7613ea45ecb3751c';
const authToken = '1a0521ce48361207e11dde1dd11c41a5';
const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({
//          from: 'whatsapp:+14155238886',
//          body: 'Hello there!',
//          to: 'whatsapp:+5492478446733'
//        })
//       .then(message => console.log(message.sid));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./src/routes'));


let server = app.listen(8080, ()=> console.log("Server iniciado"));

module.exports = server; 