const express = require('express');
const router = new express.Router;
const Local = require('./controller/local');
router.get('/',(req,res)=>res.send('ok'));

router.route('/local/:idLocal').get(Local.getById);
router.route('/local/:idLocal/producto').post(Local.nuevoProductoLocal);
router.route('/local/:idLocal/productos').get(Local.getPorductosLocal);

module.exports = router;