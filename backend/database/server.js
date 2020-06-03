const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const mongoose = require('mongoose');
const mercadopago = require('mercadopago');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(require('./src/routes'));

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-3457279708576154-060321-813e885a833495f547846e43d3398019-174549524'
});



function get_boton_pago(callback) {
    let preference = {
      items: [{
        id: '1500',
        title: "Pepe",
        quantity: 1,
        currency_id: 'ARS',
        unit_price: 120
      }
      ],
      "payer": {
        "email": "test_user_88440868@testuser.com"
      }
    }

    mercadopago.preferences.create(preference).then(callback);
  }

app.get("/mercadopago", (req, res) => {
    // get_boton_pago((response) => {
    //     // Este valor reemplazará el string "$$init_point$$" en tu HTML
    //     console.log("response del body " + response.body.init_point)
    // })
    // Crea un objeto de preferencia
let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  // Este valor reemplazará el string "$$init_point$$" en tu HTML
    global.init_point = response.body.init_point;
    return res.send(global.init_point);
  }).catch(function(error){
    console.log(error);
  });
})

let server = app.listen(8080, ()=> console.log("Server iniciado"));

module.exports = server; 