const Producto = require('../models/producto');

module.exports = {

    getPorductos: async (req, res, next) => {
        const productos = await Producto.find().populate('local');        
        return res.send(productos);
    },
    
    getProducto: async (req, res, next) => {
        const {nombre} = req.params;
        const producto = await Producto.find({"nombre":{ $regex: '(?i).*' + nombre + '.*(?-i)' }}).populate('local');
        return res.send(producto)
    },

    actualizar: async (req, res, next) => {
        const {idProducto} = req.params
        Producto.findByIdAndUpdate(idProducto, req.body, function (err, producto) {
            if (err) return next(err);
            return res.json(producto);
        })
    }

};