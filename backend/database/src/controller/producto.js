const Producto = require('../models/producto').Producto;

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

    getProductoId: async (req, res, next) => {
        const {idProducto} = req.params;
        const producto = await Producto.findById(idProducto);
        return res.send(producto)
    },

    actualizar: async (req, res, next) => {
        const {idProducto} = req.params;
        var producto = await Producto.findById(idProducto);
        producto.nombre = req.body.nombre != 'undefined' ? req.body.nombre : "";
        producto.precio = req.body.precio != "" ? req.body.precio : 0;
        producto.cantidad = req.body.cantidad != "" ? req.body.cantidad : 0;
        producto.detalle = req.body.detalle != 'undefined' ? req.body.detalle : "";
        producto.categoria = req.body.categoria != 'undefined' ? req.body.categoria : "";
        producto.oculto = req.body.oculto;
        if(req.file){
            const {location} = req.file;
            producto.setImgUrl(location);
        }
        await producto.save();
        res.json(producto);
    }

};