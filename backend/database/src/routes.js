const express = require('express');
const router = new express.Router;
const axios = require('axios')
const Local = require('./controller/local');
const Producto = require('./controller/producto');
const Usuario = require('./controller/usuario');
const Empresa = require('./controller/empresa');
const Carrito = require('./controller/carrito');
const Mercadopago = require('./controller/mercadopago');
const uploadImg = require('./storage/storage');
const Pago = require('./controller/pago');
router.get('/',(req,res)=>res.send('ok'));

//consultas de local
router.route('/local/:idLocal').get(Local.getById);
router.route('/local/:idLocal/producto').post(uploadImg.single('image') ,Local.nuevoProductoLocal);
router.route('/local/:idLocal/productos').get(Local.getPorductosLocal);
router.route('/local/:idLocal/productos/visibles').get(Local.getPorductosLocalVisibles);
router.route('/local/:idLocal/:idProducto').delete(Local.eliminarProductoLocal);
router.route('/local/:idLocal/:idUsuario/pedido').post(Local.nuevoPedidoLocal);
router.route('/local/:idLocal/pedidos').get(Local.getPedidos);

//consultas de carrito local
router.route('/carrito/:idPedido/usuario').put(Carrito.actualizar);
router.route('/carrito/:idPedido/local').put(Carrito.actualizarPedicoLocal);
router.route('/carrito/:idPedido/local').get(Carrito.getPedido);
router.route('/carrito/:idPedido/producto').put(Carrito.eliminarProducto);
router.route('/carrito/:idPedido/producto/sumar').put(Carrito.sumarUnProducto);
router.route('/carrito/:idPedido/producto/restar').put(Carrito.restarUnProducto);

//consultas del producto
router.route('/producto/productos').get(Producto.getPorductos);
router.route('/producto/:nombre').get(Producto.getProducto);
router.route('/producto/id/:idProducto').get(Producto.getProductoId);
router.route('/producto/:idProducto').put(Producto.actualizar);

//consultas del usuario
router.route('/usuario').post(Usuario.nuevoUsuario);
router.route('/usuario/:idUsuario/empresa').post(Usuario.nuevoEmpresaUsuario);
router.route('/usuario/:nickname').get(Usuario.getUsuario);
router.route('/usuario/:idUsuario/empresa').get(Usuario.getEmpresa);
router.route('/usuario/:idLocal/:nickname/pedido').post(Usuario.agregarPedidoUsuario);
router.route('/usuario/:nickname/pedidos').get(Usuario.getPedidos);
router.route('/usuario/:nickname/pedido/:idEmpresa').get(Usuario.getPedido);
router.route('/usuario/:nickname/pedidosPendiente/:idEmpresa').get(Usuario.getPedidosPendientes);
router.route('/usuario/:nickname/pedidosListo/:idEmpresa').get(Usuario.getPedidosListos);
router.route('/usuario/:idUsuario/plan').put(Usuario.habilitarPlan);

//consultas de empresa
router.route('/empresa/:idEmpresa/local').post(Empresa.nuevoLocalEmpresa);
router.route('/empresa/:idEmpresa/categoria').post(Empresa.nuevaCategoriaEmpresa);
router.route('/empresa/:idEmpresa/categoria').put(Empresa.eliminarCategoriaEmpresa);
router.route('/empresa/:idEmpresa').get(Empresa.getEmpresa);

//consultas de mercadopago
router.route('/mercadopago').post(Mercadopago.getIdPreference);
router.post('/mercadopago/notificaciones', (req,res)=>{
    console.log(req.query.id); res.sendStatus(200)
    
    axios.get('https://api.mercadopago.com/v1/payments/'+ req.query.id +'?access_token=' + process.env.ACCESS_TOKEN_PROD_MARKETPLACE)
    .then((res) => console.log(res.data))
});
router.route('/mercadopago/:idVendedor').post(Mercadopago.getIdPreference);
router.route('/mercadopago/vendedor/:nickname').post(Mercadopago.nuevoVendedor);

//consultas de pago
router.route('/pago/:idUsuario').get(Pago.getEstadoDelPlan);

module.exports = router;