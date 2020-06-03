const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mensajeSchema = new mongoose.Schema({
    usuario: { type: String },
    contenido: { type: String },
});

const Mensaje = mongoose.model('mensaje', mensajeSchema);
module.exports = { mensajeSchema, Mensaje }