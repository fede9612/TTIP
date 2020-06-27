const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pagoSchema = new mongoose.Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    fecha: {type: Date, default: Date.now()},
    monto: {type: Number}
});

const Pago = mongoose.model('pago', pagoSchema);
module.exports = { pagoSchema, Pago};