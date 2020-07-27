const Usuario = require('../models/usuario').Usuario;
const Pago = require('../models/pago').Pago;
const moment = require('moment');


module.exports = {

    getEstadoDelPlan: async (req, res, next) =>{
        const {idUsuario} = req.params;
        const usuario = await Usuario.findById(idUsuario).populate('pagos');
        //Si no tiene pago devuelve uno para que en fontend pueda agregar la prueba de 30 días
        if(usuario.getUltimoPago() == undefined){
            res.send(new Pago());
        }else{
            const diasRestantes = moment(Date.now()).diff(moment(usuario.getUltimoPago().fecha), 'days'); 
            console.log(diasRestantes)
            if((diasRestantes) >= 30){
                usuario.habilitado = false;
                usuario.save(function (err){
                    if (err) return next(err)
                });
                return res.json(diasRestantes);
            }else{
                return res.json(diasRestantes);
            }
        }
    }
}