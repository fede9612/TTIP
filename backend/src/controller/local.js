const Local = require('../models/local');
const Producto = require('../models/producto');

module.exports = {

    nuevoLocal: async (req, res, next) =>{
        const local = new Local(req.body);
        await local.save();
        res.status(201).json(local);
    },

    getById: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal);
        return res.send(local);
    },

    getPorductosLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal).populate('productos');
        return res.send(local.productos);
    },

    nuevoProductoLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        const nuevoProducto = new Producto(req.body);
        const local = await Local.findById(idLocal);
        nuevoProducto.local = local;
        await nuevoProducto.save();
        local.productos.push(nuevoProducto);
        await local.save();
        res.status(201).json(nuevoProducto);
    },
    

};