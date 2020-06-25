const mercadopago = require('mercadopago');
const VendedorMercadopago = require('../models/vendedoresMercadopago').VendedorMercadopago;
const Usuario = require('../models/usuario').Usuario;

module.exports = {

    nuevoVendedor: async (req, res, next) => {
        const {nickname} = req.params;
        const usuario = await Usuario.findOne({"mail": nickname});
        const encontrado = await VendedorMercadopago.findOne({"vendedor": usuario._id});
        if(encontrado === null){
            var vendedor = new VendedorMercadopago(req.body);
            vendedor.vendedor = usuario;
            vendedor.save();
            return res.sendStatus(200);
        }else{
            await VendedorMercadopago.findByIdAndUpdate(encontrado._id, req.body, function (err, producto) {
                if (err) return next(err);
                return res.sendStatus(202);
            })
        }
    },

    getIdPreference: async (req, res, next) => {
        const {idVendedor} = req.params;
        const vendedor = await Usuario.findById(idVendedor);
        const vendedorMercadopago = await VendedorMercadopago.findOne({"vendedor": vendedor._id});
          // Agrega credenciales
        mercadopago.configure({
            access_token: vendedorMercadopago.access_token
        });
        var items = [];
        req.body.productos.map((producto) => {
            items.push({
                title: producto.nombre,
                unit_price: producto.precio,
                quantity: producto.cantidad
            })
        })
        console.log(req.body.payer.email)
        let preference = {
            items: items,
            external_reference: `${req.body.payer.email}`,
            back_urls: {
                "success": req.body.redirect,
                "failure": "http://localhost:3000/",
                "pending": "http://localhost:3000/"
            },
            //Esto me retorna automáticamente cuando el pago fue success
            auto_return: "approved"
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
    },

    notificaciones: async (req, res, next) => {
        console.log(req.query.id); res.sendStatus(200)

        axios.get('https://api.mercadopago.com/v1/payments/'+ req.query.id +'?access_token=' + process.env.ACCESS_TOKEN_PROD_MARKETPLACE)
        .then((res) => console.log(res.data))
    }
};