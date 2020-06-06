const Empresa = require('../models/empresa').Empresa;
const Usuario = require('../models/usuario').Usuario;
const Carrito = require('../models/carrito').Carrito;
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
        const usuario = await Usuario.findOne({'mail': nickname});
        const pedido = await Carrito.findOne({'usuarioDelPedido._id': usuario._id, "pendiente": true}).populate('local');
        return res.send(pedido);
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
        const {nickname} = req.params;
        const local = await Local.findById(idLocal);
        const usuario = await Usuario.findOne({'mail': nickname}).populate('carritosDePedido');
        var encontro = false;
        var pedido;
        usuario.carritosDePedido.map((_pedido) => {
            if(_pedido.local.equals(local._id) && _pedido.pendiente && !_pedido.confirmado){
                encontro = true;
                pedido = _pedido;
                pedido.pedidos.push(producto);   
            }
        });
        if(!encontro){
            const pedido = new Carrito();
            pedido.local = local;
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
    }
};