const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empresaSchema = new mongoose.Schema({
    nombre: {
        type: String 
    },
    cuit: {
        type: String
    },
    locales: [{type: Schema.Types.ObjectId, ref: 'local'}]
});

module.exports = mongoose.model('empresa', empresaSchema);