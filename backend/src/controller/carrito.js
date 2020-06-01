const Carrito = require('../models/carrito').Carrito;
const mails = require('../../src/mails');

module.exports = {
    
    getPedido: async (req, res, next) => {
        const {idPedido} = req.params;
        Carrito.findById(idPedido, function (err, producto) {
            if (err) return next(err);
            return res.send(producto);
        })
    },

    actualizar: async (req, res, next) => {
        const {idPedido} = req.params;
        pedido = await Carrito.findByIdAndUpdate(idPedido, req.body, function (err) {
            if (err) return next(err);
        })
        if(pedido.confirmado){
            const _pedido = await Carrito.findOne(pedido).populate('local');
            mails.main(_pedido.local.mail, "local").catch(console.error + 'envio al local');
        } 
        return res.json(pedido);
    },

    actualizarPedicoLocal: async (req, res, next) => {
        const {idPedido} = req.params;
        pedido = await Carrito.findByIdAndUpdate(idPedido, req.body, function (err) {
            if (err) return next(err);
        })
        if(!pedido.pendiente){
            const _pedido = await Carrito.findOne(pedido).populate('local');
            mails.main(_pedido.usuarioDelPedido.mail + '@gmail.com', "comprador").catch(console.error);
        } 
        return res.json(pedido);
    }
    
};