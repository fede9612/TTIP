const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let salaSchema = new mongoose.Schema({
    room: {
        type: String 
    },
    mensajes: [{type: Schema.Types.ObjectId, ref: 'mensaje'}],
});

const Sala = mongoose.model('sala', salaSchema);
module.exports = { salaSchema, Sala }