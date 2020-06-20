const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productoSchema = new mongoose.Schema({
    nombre: { type: String },
    precio: {
        type: Number,
        default: 0
    },
    cantidad: {
        type: Number,
        default: 0
    },
    categoria:{
        type: String,
        default: "Otro"
    },
    detalle:{ type: String },
    imgUrl:{ type: String },
    oculto: {
        type: Boolean,
        default: false
    },
    local: {type: Schema.Types.ObjectId, ref: 'local'}
});

productoSchema.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUrl = 'http://localhost:8080/public/' + filename
}

const Producto = mongoose.model('producto', productoSchema);
module.exports = { productoSchema, Producto }