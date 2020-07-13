const Local = require('../models/local');
const Empresa = require('../models/empresa').Empresa;

module.exports = { 

    getEmpresa: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        var empresa = await Empresa.findById(idEmpresa).populate("locales");
        return res.send(empresa);
    },

    nuevoLocalEmpresa: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        const nuevoLocal = new Local(req.body);
        const empresa = await Empresa.findById(idEmpresa);
        nuevoLocal.empresa = empresa;
        await nuevoLocal.save();
        empresa.locales.push(nuevoLocal);
        await empresa.save(function (err) {
            if (err) return next(err);
        });
        return res.send(nuevoLocal);
    },

    nuevaCategoriaEmpresa: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        const categoria = req.body.categoria
        const empresa = await Empresa.findById(idEmpresa);
        empresa.categoriasDeProductos.push(categoria);
        await empresa.save(function (err) {
            if (err) return next(err);
            return res.send(categoria);
        });
    },

    eliminarCategoriaEmpresa: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        const categoria = req.body.categoria
        var empresa = await Empresa.findById(idEmpresa);
        var categoriasNew = [];
        empresa.categoriasDeProductos.map((_categoria) => {
            if(_categoria != categoria){
                categoriasNew.push(_categoria);
            }
        });
        empresa.categoriasDeProductos = categoriasNew;
        await empresa.save(function (err) {
            if (err) return next(err);
            return res.send(empresa.categoriasDeProductos);
        });
    },

    getEmpresaAlias: async (req, res, next) =>{
        const {aliasEmpresa} = req.params;
        const empresa = await Empresa.findOne({alias: aliasEmpresa}).populate("locales");;
        return res.send(empresa);
    }
};