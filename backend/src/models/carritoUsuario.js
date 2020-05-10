const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductoSchema = require('producto');

let carritoUsuarioSchema = new mongoose.Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    pedidos: { ProductoSchema },
    direccionDeSucursal: { type: String},
    precioDelPedido: { type: Number }
});

module.exports = mongoose.model('carritoUsuario', carritoUsuarioSchema);