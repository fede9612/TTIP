const Carrito = require('../models/carrito').Carrito;

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
        Carrito.findByIdAndUpdate(idPedido, req.body, function (err, producto) {
            if (err) return next(err);
            return res.json(producto);
        })
    }

};