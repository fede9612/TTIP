const Local = require('../models/local');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

module.exports = {

    nuevoUsuario: async (req, res, next) =>{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    },

    
};