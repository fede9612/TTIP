const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-3457279708576154-060321-813e885a833495f547846e43d3398019-174549524'
});

module.exports = {

    getIdPreference: async (req, res, next) => {
        let preference = {
            items: [
              {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 2,
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
    }
};