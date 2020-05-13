const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const empresaSchema = require('./empresa').empresaSchema;

let usuarioSchema = new mongoose.Schema({
    mail: {
        type: String 
    },
    empresa: empresaSchema,
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'carritoUsuario'}]
});

module.exports = mongoose.model('usuario', usuarioSchema);