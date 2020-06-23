const Usuario = require('../models/usuario').Usuario;
const Pago = require('../models/pago').Pago;
const moment = require('moment');


module.exports = {

    getEstadoDelPlan: async (req, res, next) =>{
        const {idUsuario} = req.params;
        const usuario = await Usuario.findById(idUsuario).populate('pagos');
        if((moment(Date.now()).diff(moment(usuario.getUltimoPago()), 'days')) == 30){
            usuario.habilitado = false;
            usuario.save(function (err){
                if (err) return next(err)
                res.sendStatus(200);
            })
        }else{
            return res.json(moment(Date.now()).diff(moment(usuario.getUltimoPago()), 'days'));
        }
    }
}