const Local = require('../models/local');
const Producto = require('../models/producto').Producto;
const Carrito = require('../models/carrito').Carrito;
const Usuario = require('../models/usuario').Usuario;

module.exports = {

    getById: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal).populate('empresa');
        return res.send(local);
    },

    getPorductosLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal).populate('productos');
        return res.send(local.productos);
    },

    getPorductosLocalVisibles: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal).populate('productos');
        var productosVisibles = [];
        local.productos.map((producto) => {
            if(!producto.oculto){
                productosVisibles.push(producto);
            }
        })
        return res.send(productosVisibles);
    },

    nuevoProductoLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        const nuevoProducto = new Producto(req.body);
        const local = await Local.findById(idLocal);
        nuevoProducto.local = local;
        await nuevoProducto.save();
        local.productos.push(nuevoProducto);
        await local.save(function (err) {
            if (err) return next(err);
            return res.json(nuevoProducto);
        });
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
    },

    nuevoPedidoLocal: async (req, res, next) =>{
        const {idLocal} = req.params;
        let productos = req.body;
        const {idUsuario} = req.params;
        const local = await Local.findById(idLocal);
        const usuario = await Usuario.findById(idUsuario);
        const pedido = new Carrito();
        pedido.local = local;
        pedido.pedidos = productos;
        pedido.usuarioDelPedido = usuario;
        await pedido.save();
        local.carritosDePedido.push(pedido);
        await local.save(function (err) {
            if (err) return next(err);
            return res.sendStatus(201);
        });
        
    },

    getPedidos: async (req, res, next) =>{
        const {idLocal} = req.params;
        const local = await Local.findById(idLocal).populate('carritosDePedido');
        let pedidos = [];
        local.carritosDePedido.map((pedido) => {
            if(pedido.confirmado){
                pedidos.push(pedido);
            }
        })
        return res.send(pedidos);
    }
};