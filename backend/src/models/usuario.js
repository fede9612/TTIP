const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let usuarioSchema = new mongoose.Schema({
    mail: {
        type: String 
    },
    empresas: [{type: Schema.Types.ObjectId, ref: 'empresa'}],
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'carritoUsuario'}]
});

module.exports = mongoose.model('usuario', usuarioSchema);