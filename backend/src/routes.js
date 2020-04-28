const express = require('express');
const router = new express.Router;
const Local = require('./controller/local');
const Producto = require('./controller/producto');
router.get('/',(req,res)=>res.send('ok'));

router.route('/local').post(Local.nuevoLocal);
router.route('/local/:idLocal').get(Local.getById);
router.route('/local/:idLocal/producto').post(Local.nuevoProductoLocal);
router.route('/local/:idLocal/productos').get(Local.getPorductosLocal);

router.route('/producto/productos').get(Producto.getPorductos);
router.route('/producto/:nombre').get(Producto.getProducto);

module.exports = router;