const Local = require('../models/local');
const Producto = require('../models/producto');

module.exports = {

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
        res.status(201);
    },

    eliminarProductoLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal);
        const {idProducto} = req.params;
        const productoObtenido = await Producto.findById(idProducto);
        let productos = [];
        local.productos.map((producto) => {
            if(producto._id != productoObtenido.id){
                productos.push(producto);
            }
        });
        local.productos = productos;
        await local.save();
        await Producto.findByIdAndDelete(idProducto, function (err, producto) {
            if (err) return next(err);
            return res.sendStatus(201);
        }).exec();
    }
};