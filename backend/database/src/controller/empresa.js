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
        return res.sendStatus(200);
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

    modificarEmpresaAlias: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        var alias = req.body.alias;
        var empresaAlias = await Empresa.findOne({alias: alias}).populate("locales");
        if(empresaAlias){
            return res.sendStatus(400);
        }else{
            var empresa = await Empresa.findById(idEmpresa);
            empresa.alias = alias;
            empresa.save();
            return res.send(empresa);
        }
    },

    getEmpresaAlias: async (req, res, next) =>{
        const {aliasEmpresa} = req.params;
        const empresa = await Empresa.findOne({alias: aliasEmpresa}).populate("locales");
        return res.send(empresa);
    }
};