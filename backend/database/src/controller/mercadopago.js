const mercadopago = require('mercadopago');
const axios = require('axios');
var parseStringData = require('parse-string-data');
const VendedorMercadopago = require('../models/vendedoresMercadopago').VendedorMercadopago;
const Usuario = require('../models/usuario').Usuario;
const Pago = require('../models/pago').Pago;
const Carrito = require('../models/carrito').Carrito;

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
            req.body.fecha_configuracion = Date.now();
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
        let preference = {
            items: items,
            external_reference: `${req.body.reference}`,
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
        //Esta respuesta se envía porque así lo pide mercadopago para saber que nuestro server está prendido
        res.sendStatus(200)
        axios.get("https://api.mercadopago.com/v1/payments/"+req.query.id+"?access_token="+process.env.ACCESS_TOKEN_PROD_MARKETPLACE)
        .then(async (res) => {
            //Si la compra está aprovada y acreditada
            if(res.data.status == 'approved' && res.data.status_detail == 'accredited'){  
                console.log(parseStringData(res.data.external_reference));  
                // Si lo primero que viene en el preference es usuario: quiere decir que se debe a un pago de suscripción
                if(parseStringData(res.data.external_reference).plan){
                    const usuarioReference = parseStringData(res.data.external_reference);
                    var usuario = await Usuario.findById(usuarioReference._id);
                    var pago = new Pago();
                    pago.usuario = usuario._id;
                    pago.monto = res.data.transaction_details.total_paid_amount;
                    var fecha = new Date();
                    fecha.setDate(fecha.getDate() + parseStringData(res.data.external_reference).diasPendientes);
                    pago.fecha = fecha;
                    await pago.save();
                    if(usuario.pagos){
                        usuario.pagos.push(pago);
                    }else{
                        usuario.pagos = [pago._id];
                    }
                    usuario.habilitado = true;
                    usuario.save(function (err){
                        if (err) return next(err)     
                    })
                }

                if(parseStringData(res.data.external_reference).compra){
                    parseStringData(res.data.external_reference).pedidos.map(async (pedido) =>{
                        var pedido = await Carrito.findById(pedido.idPedido);
                        pedido.confirmado = true;
                        axios.get(process.env.URLDATABASE+'/local/' + pedido.local)
                        .then((res) => { 
                            axios.put(process.env.URLDATABASE+'/carrito/' + pedido._id + '/usuario', {pedido, idVendedor: res.data.empresa.usuario})
                        });
                    })
                    
                }
            }
        });
    }
};