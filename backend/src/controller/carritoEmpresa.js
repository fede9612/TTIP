const CarritoEmpresa = require('../models/carritoEmpresa').CarritoEmpresa;

module.exports = {
    
    getPedido: async (req, res, next) => {
        const {idPedido} = req.params;
        CarritoEmpresa.findById(idPedido, function (err, producto) {
            if (err) return next(err);
            return res.send(producto);
        })
    },

    actualizar: async (req, res, next) => {
        const {idPedido} = req.params;
        CarritoEmpresa.findByIdAndUpdate(idPedido, req.body, function (err, producto) {
            if (err) return next(err);
            return res.json(producto);
        })
    }

};