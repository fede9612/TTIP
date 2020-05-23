const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductoSchema = require('../models/producto').productoSchema;
var UsuarioSchema = require('../models/usuario').usuarioSchema;

let carritoEmpresaSchema = new mongoose.Schema({
    local: { type: Schema.Types.ObjectId, ref: 'local' },
    pedidos: [ ProductoSchema ],
    usuarioDelPedido:  UsuarioSchema,
    pendiente: {
        type: Boolean,
        default: true 
    }
});

const CarritoEmpresa = mongoose.model('carritoEmpresa', carritoEmpresaSchema);
module.exports = { carritoEmpresaSchema, CarritoEmpresa };