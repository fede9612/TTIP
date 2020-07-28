const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let notificacionSchema = new mongoose.Schema({
    nickname: { type: String },
    contenido: { type: String },
});

const Notificacion = mongoose.model('notificacion', notificacionSchema);
module.exports = { notificacionSchema, Notificacion }