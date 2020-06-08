const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let localSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    direccion: {
        type: String
    },
    latitud: {
        type: Number,
        default: 0
    },
    longitud: {
        type: Number,
        default: 0
    },
    mail: {
        type: String,
        default: ""
    },
    empresa: { type: Schema.Types.ObjectId, ref: 'empresa' },
    productos: [{ type: Schema.Types.ObjectId, ref: 'producto' }],
    categorias: {type:[String]},
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'Carrito'}]
});

module.exports = mongoose.model('local', localSchema);