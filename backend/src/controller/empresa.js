const Local = require('../models/local');
const Empresa = require('../models/empresa');

module.exports = { 

    nuevoLocalEmpresa: async (req, res, next) =>{
        const {idEmpresa} = req.params;
        const nuevoLocal = new Local(req.body);
        const empresa = await Empresa.findById(idEmpresa);
        nuevoLocal.empresa = empresa;
        await nuevoLocal.save();
        empresa.locales.push(nuevoLocal);
        await empresa.save();
        res.status(201).json(nuevoLocal);
    }
};