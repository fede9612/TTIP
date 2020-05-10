const Local = require('../models/local');
const Empresa = require('../models/empresa');
const Usuario = require('../models/usuario');

module.exports = {

    nuevoUsuario: async (req, res, next) =>{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    },
    
    nuevoEmpresaUsuario: async (req, res, next) =>{
        const {idUsuario} = req.params;
        const nuevoEmpresa = new Empresa(req.body);
        const usuario = await Usuario.findById(idUsuario);
        nuevoEmpresa.usuario = usuario;
        await nuevoEmpresa.save();
        usuario.empresas.push(nuevoEmpresa);
        await usuario.save();
        res.status(201).json(nuevoEmpresa);
    }
};