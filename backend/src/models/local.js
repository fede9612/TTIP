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
        type: Number
    },
    longitud: {
        type: Number
    },
    empresa: { type: Schema.Types.ObjectId, ref: 'empresa' },
    productos: [{ type: Schema.Types.ObjectId, ref: 'producto' }],
    carritosDePedido: [{type: Schema.Types.ObjectId, ref: 'Carrito'}]
});

module.exports = mongoose.model('local', localSchema);