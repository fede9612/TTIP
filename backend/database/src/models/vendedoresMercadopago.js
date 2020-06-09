const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let vendedorMercadopagoSchema = new mongoose.Schema({
    vendedor: {type: Schema.Types.ObjectId, ref: 'usuario'},
    access_token: {type: String},
	token_type: {type: String},
	expires_in: {type: Number},
	scope: {type: String},
	user_id: {type: Number},
	refresh_token: {type: String},
	public_key: {type: String},
	live_mode: {type: Boolean}
});

const VendedorMercadopago = mongoose.model('vendedoresMercadopago', vendedorMercadopagoSchema);
module.exports = { vendedorMercadopagoSchema, VendedorMercadopago }