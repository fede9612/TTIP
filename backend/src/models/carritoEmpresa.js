const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductoSchema = require('producto');
var UsurioSchema = require('usuario')

let carritoEmpresaSchema = new mongoose.Schema({
    sucursal: { type: Schema.Types.ObjectId, ref: 'local' },
    pedidos: { ProductoSchema },
    usuarioDelPedido: { UsurioSchema }, 
    montoDelPedido: { type: Number }
});

module.exports = mongoose.model('carritoEmpresa', carritoEmpresaSchema);