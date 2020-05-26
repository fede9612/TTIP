const Empresa = require('../models/empresa').Empresa;
const Usuario = require('../models/usuario').Usuario;

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
                console.log("entro");
                const usuario = new Usuario();
                usuario.mail = nickname;
                await usuario.save();
                return res.status(201).json(usuario);
            }
            console.log("no entro");
            return res.status(201).json(usuario);
       });
        
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
        await usuario.save();
        res.status(201).json(nuevoEmpresa);
    }
};