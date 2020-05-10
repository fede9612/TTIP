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
    locales: [{type: Schema.Types.ObjectId, ref: 'local'}]
});

module.exports = mongoose.model('empresa', empresaSchema);