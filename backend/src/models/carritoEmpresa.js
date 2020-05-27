const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductoSchema = require('../models/producto').productoSchema;
var UsuarioSchema = require('../models/usuario').usuarioSchema;

let carritoSchema = new mongoose.Schema({
    local: { type: Schema.Types.ObjectId, ref: 'local' },
    pedidos: [ ProductoSchema ],
    usuarioDelPedido:  UsuarioSchema,
    pendiente: {
        type: Boolean,
        default: true 
    }
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = { carritoSchema, Carrito };