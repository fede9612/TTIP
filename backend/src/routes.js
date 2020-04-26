const express = require('express');
const router = new express.Router;
const Local = require('./controller/local');
router.get('/',(req,res)=>res.send('ok'));

router.route('/:idLocal/producto').post(Local.nuevoProductoLocal);
router.route('/:idLocal/productos').get(Local.getPorductosLocal);

module.exports = router;