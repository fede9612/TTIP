const Carrito = require('../models/carrito').Carrito;
const Producto = require('../models/producto').Producto;
const Usuario = require('../models/usuario').Usuario;
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
        pedido = await Carrito.findByIdAndUpdate(idPedido, req.body.pedido, function (err) {
            if (err) return next(err);
        })
        if(pedido.confirmado){
            const vendedor = await Usuario.findById(req.body.idVendedor);
            mails.nuevoPedido(vendedor.mail+'@gmail.com').catch(console.error + 'envio al local');
        } 
        return res.json(pedido);
    },

    sumarUnProducto: async (req, res, next) => {
        const {idPedido} = req.params;
        const productoASumar = req.body;
        const productoBuscado = await Producto.findById(productoASumar._id);
        var pedido = await Carrito.findById(idPedido);
        var productos = [];
        pedido.pedidos.map(async (producto) => {
            if(producto._id.equals(productoASumar._id) && productoBuscado.cantidad > productoASumar.cantidad){
                producto.cantidad += 1;
                productos.push(producto);
            }else{
                productos.push(producto);
            }
        })
        pedido.pedidos = productos;
        await pedido.save();
        return res.json(pedido);
    },

    restarUnProducto: async (req, res, next) => {
        const {idPedido} = req.params;
        const productoARestar = req.body;
        var pedido = await Carrito.findById(idPedido);
        var productos = [];
        pedido.pedidos.map((producto) => {
            if(producto._id.equals(productoARestar._id) && producto.cantidad >1){
                producto.cantidad -= 1;
                productos.push(producto);
            }else{
                productos.push(producto);
            }
        })
        pedido.pedidos = productos;
        await pedido.save();
        return res.json(pedido);
    },

    eliminarProducto: async (req, res, next) => {
        const {idPedido} = req.params;
        const productoAEliminar = req.body;
        var pedido = await Carrito.findById(idPedido);
        var productos = [];
        pedido.pedidos.map((producto) => {
            if(!producto._id.equals(productoAEliminar._id)){
                productos.push(producto);
            }
        })
        pedido.pedidos = productos;
        await pedido.save();
        return res.json(pedido);
    },

    actualizarPedicoLocal: async (req, res, next) => {
        const {idPedido} = req.params;
        pedido = await Carrito.findByIdAndUpdate(idPedido, req.body, function (err) {
            if (err) return next(err);
        })
        if(!pedido.pendiente){
            const _pedido = await Carrito.findOne(pedido).populate('local');
            mails.pedidoListo(_pedido.usuarioDelPedido.mail + '@gmail.com').catch(console.error + 'envío al comprador');
        } 
        return res.json(pedido);
    }
    
};