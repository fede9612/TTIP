const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empresaSchema = new mongoose.Schema({
    nombre: {
        type: String 
    },
    cuit: {
        type: Number
    },
    locales: [{type: Schema.Types.ObjectId, ref: 'local'}]
});

const Empresa = mongoose.model('empresa', empresaSchema);
module.exports = { empresaSchema, Empresa};