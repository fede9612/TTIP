const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    // acá necesito el access token del vendedor, lo tengo que obtener de la empresa en un atributo llamado vendedorToken
    access_token: 'TEST-3457279708576154-060321-813e885a833495f547846e43d3398019-174549524'
});

module.exports = {

    getIdPreference: async (req, res, next) => {
        var items = [];
        req.body.map((producto) => {
            items.push({
                title: producto.nombre,
                unit_price: producto.precio,
                quantity: 1
            })
        })
        let preference = {
            items: items,
            back_urls: {
                "success": "http://localhost:3000/",
                "failure": "http://localhost:3000/",
                "pending": "http://localhost:3000/"
            },
          };
          
          mercadopago.preferences.create(preference)
          .then(function(response){
          // Este valor reemplazará el string "$$init_point$$" en tu HTML
            global.init_point = response.body.init_point;
            console.log(global.init_point)
            return res.send(global.init_point);
          }).catch(function(error){
            console.log(error);
          });
    }
};