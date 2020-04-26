const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new mongoose.Schema({
    nombre: {
        type: String
        
    },
    precio: {
        type: Number,
        default: 0
    },
    cantidad: {
        type: Number,
        default: 0
    },
    local: {type: Schema.Types.ObjectId, ref: 'local'}
});

module.exports = mongoose.model('producto', productoSchema);