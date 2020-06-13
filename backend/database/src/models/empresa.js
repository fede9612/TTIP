const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empresaSchema = new mongoose.Schema({
    nombre: {
        type: String 
    },
    cuit: {
        type: Number
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'usuario' },
    locales: [{type: Schema.Types.ObjectId, ref: 'local'}],
    categoriasDeProductos: [{type:String}]
});

const Empresa = mongoose.model('empresa', empresaSchema);
module.exports = { empresaSchema, Empresa};