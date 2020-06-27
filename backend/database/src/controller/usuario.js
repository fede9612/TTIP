const Empresa = require('../models/empresa').Empresa;
const Usuario = require('../models/usuario').Usuario;
const Carrito = require('../models/carrito').Carrito;
const Producto = require('../models/producto').Producto;
const Pago = require('../models/pago').Pago;
const Local = require('../models/local');

module.exports = {

    nuevoUsuario: async (req, res, next) =>{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    },

    getUsuario: async (req, res, next) =>{
        const {nickname} = req.params;
        await Usuario.findOne({'mail': nickname}, async function(err, usuario){
            if(usuario == null){
                const usuario = new Usuario();
                usuario.mail = nickname;
                await usuario.save();
                return res.status(201).json(usuario);
            }
            return res.status(201).json(usuario);
       });
        
    },

    getPedidos: async (req, res, next) =>{
        const {nickname} = req.params;
        const usuario = await Usuario.findOne({'mail': nickname});
        const pedidos = await Carrito.find({'usuarioDelPedido._id': usuario._id}).populate('local');
        return res.send(pedidos);
    },

    getPedido: async (req, res, next) =>{
        const {nickname} = req.params;
        const {idEmpresa} = req.params;
        const empresa = await Empresa.findById(idEmpresa).populate('locales');
        const usuario = await Usuario.findOne({'mail': nickname});
        var pedidosSinConfirmarDeUsuario = await Carrito.find({'usuarioDelPedido._id': usuario._id, "confirmado": false}); 
        var pedidos = []
        //Buscar entro los pedidos pendientes del usuario los pedidos que son de una empresa en especifica que puede tener varios locales
        pedidosSinConfirmarDeUsuario.map((pedido) => {
            empresa.locales.map((local) => {
                if(pedido.local.equals(local._id)){
                    pedidos.push(pedido)
                }
            })
        })
        return res.send(pedidos);
    },

    getPedidosPendientes: async (req, res, next) =>{
        const {nickname} = req.params;
        const {idEmpresa} = req.params;
        const empresa = await Empresa.findById(idEmpresa).populate('locales');
        const usuario = await Usuario.findOne({'mail': nickname});
        var pedidosPendientesDeUsuario = await Carrito.find({'usuarioDelPedido._id': usuario._id, "confirmado": true, "pendiente": true}); 
        var pedidos = []
        //Buscar entro los pedidos pendientes del usuario los pedidos que son de una empresa en especifica que puede tener varios locales
        pedidosPendientesDeUsuario.map((pedido) => {
            empresa.locales.map((local) => {
                if(pedido.local.equals(local._id)){
                    pedidos.push(pedido)
                }
            })
        })
        return res.send(pedidos);
    },

    getPedidosListos: async (req, res, next) =>{
        const {nickname} = req.params;
        const {idEmpresa} = req.params;
        const empresa = await Empresa.findById(idEmpresa).populate('locales');
        const usuario = await Usuario.findOne({'mail': nickname});
        var pedidosPendientesDeUsuario = await Carrito.find({'usuarioDelPedido._id': usuario._id, "confirmado": true, "pendiente": false}); 
        var pedidos = []
        //Buscar entro los pedidos pendientes del usuario los pedidos que son de una empresa en especifica que puede tener varios locales
        pedidosPendientesDeUsuario.map((pedido) => {
            empresa.locales.map((local) => {
                if(pedido.local.equals(local._id)){
                    pedidos.push(pedido)
                }
            })
        })
        return res.send(pedidos);
    },

    getEmpresa: async (req, res, next) =>{
        const {idUsuario} = req.params;
        const usuario = await Usuario.findById(idUsuario);
        const empresa = await Empresa.findById(usuario.empresa).populate('locales');
        res.send(empresa);
    },
    
    nuevoEmpresaUsuario: async (req, res, next) =>{
        const {idUsuario} = req.params;
        const nuevoEmpresa = new Empresa(req.body);
        const usuario = await Usuario.findById(idUsuario);
        nuevoEmpresa.usuario = usuario;
        await nuevoEmpresa.save();
        usuario.empresa = nuevoEmpresa;
        await usuario.save(function (err) {
            if (err) return next(err);
            return res.sendStatus(201);
        });
    },

    agregarPedidoUsuario: async (req, res, next) =>{
        const {idLocal} = req.params;
        let producto = req.body;
        const productoBuscado = await Producto.findById(producto._id);
        const {nickname} = req.params;
        const local = await Local.findById(idLocal);
        const usuario = await Usuario.findOne({'mail': nickname}).populate('carritosDePedido');
        var encontro = false;
        var pedido;
        usuario.carritosDePedido.map((_pedido) => {
            if(_pedido.local.equals(local._id) && _pedido.pendiente && !_pedido.confirmado){
                encontro = true;
                pedido = _pedido;
                var duplicado = false;
                pedido.pedidos.map((_producto) => {
                    if(producto._id == _producto._id){
                        duplicado = true;
                        if(productoBuscado.cantidad > _producto.cantidad){
                            _producto.cantidad += 1
                        }
                    }    
                })
                if(!duplicado){
                    producto.cantidad = 1
                    pedido.pedidos.push(producto);
                }
            }
        });
        if(!encontro){
            const pedido = new Carrito();
            pedido.local = local;
            producto.cantidad = 1;
            pedido.pedidos = producto;
            pedido.usuarioDelPedido = usuario;
            await pedido.save();
            usuario.carritosDePedido.push(pedido);
            local.carritosDePedido.push(pedido._id);
            await local.save(function (err) {if (err) return next(err)});
        }else{
            await pedido.save(function (err) {if (err) return next(err)});
            await local.save(function (err) {if (err) return next(err)});
        }
        await usuario.save(function (err) {if (err) return next(err)});     
        return res.send(usuario);
    },

    habilitarPlan: async (req, res, next) =>{
        const {idUsuario} = req.params;
        var usuario = await Usuario.findById(idUsuario);
        usuario.habilitado = true;
        var pago = new Pago();
        pago.usuario = usuario._id;
        pago.monto = 500;
        await pago.save();
        if(usuario.pagos){
            usuario.pagos.push(pago);
        }else{
            usuario.pagos = [pago._id];
        }
        usuario.save(function (err){
            if (err) return next(err)
            res.sendStatus(200);
        })
    }
};