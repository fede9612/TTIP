const mongoose = require('mongoose');

let productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
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

mongoose.model('producto', productoSchema);