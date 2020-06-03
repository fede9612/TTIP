const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mensajeSchema = new mongoose.Schema({
    usuario: { type: String },
    mensaje: { type: String },
});

const Sala = mongoose.model('sala', mensajeSchema);
module.exports = { mensajeSchema, Sala }