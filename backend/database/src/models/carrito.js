const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductoSchema = require('./producto').productoSchema;
var UsuarioSchema = require('./usuario').usuarioSchema;

let carritoSchema = new mongoose.Schema({
    local: { type: Schema.Types.ObjectId, ref: 'local' },
    pedidos: [ ProductoSchema ],
    usuarioDelPedido:  UsuarioSchema,
    pendiente: {
        type: Boolean,
        default: true 
    },
    confirmado: {
        type: Boolean,
        default: false 
    }
});

const Carrito = mongoose.model('Carrito', carritoSchema);
module.exports = { carritoSchema, Carrito };