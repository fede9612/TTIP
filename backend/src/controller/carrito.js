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
        pedido = await Carrito.findByIdAndUpdate(idPedido, req.body, function (err, pedido) {
            if (err) return next(err);
        })
        if(pedido.confirmado){
            mails.main().catch(console.error);
        }
        return res.json(pedido);
    }

};