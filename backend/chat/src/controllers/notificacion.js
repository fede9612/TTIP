const Notificacion = require("../models/notificacion").Notificacion;

module.exports = {
    
    nueva: async (req, res, next) => {
        var notificacion = new Notificacion(req.body);
        await notificacion.save();
        res.json(notificacion);
    },

    eliminar: async (req, res, next) => {
        const {idNotificacion} = req.params;
        await Notificacion.deleteOne({_id: idNotificacion}, function (err) {
            if (err) return res.sendStatus(400);
            return res.sendStatus(200);
        });
    }
}