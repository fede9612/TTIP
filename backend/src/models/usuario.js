const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new mongoose.Schema({
    mail: {
        type: String 
    },
    empresa: {type: Schema.Types.ObjectId, ref: 'Empresa'},
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'Carrito'}]
});

const Usuario = mongoose.model('usuario', usuarioSchema);
module.exports = { usuarioSchema, Usuario }