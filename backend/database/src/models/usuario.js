const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new mongoose.Schema({
    mail: {
        type: String 
    },
    empresa: {type: Schema.Types.ObjectId, ref: 'Empresa'},
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'Carrito'}],
    habilitado: {type: Boolean, default: false},
    pagos: [{type: Schema.Types.ObjectId, ref: 'pago'}]
});

usuarioSchema.methods.getUltimoPago = function getUltimoPago() {
    return this.pagos.reverse()[0];
}

const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = { usuarioSchema, Usuario }