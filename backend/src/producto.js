const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('producto', productoSchema);