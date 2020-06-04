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
    }
};