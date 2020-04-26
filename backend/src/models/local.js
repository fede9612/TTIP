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
    productos: [{ type: Schema.Types.ObjectId, ref: 'producto' }]
});

module.exports = mongoose.model('local', localSchema);