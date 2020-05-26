const express = require('express');
const router = new express.Router;
const Local = require('./controller/local');
const Producto = require('./controller/producto');
const Usuario = require('./controller/usuario');
const Empresa = require('./controller/empresa');
const CarritoEmpresa = require('./controller/carritoEmpresa');
router.get('/',(req,res)=>res.send('ok'));

//consultas de local
router.route('/local/:idLocal').get(Local.getById);
router.route('/local/:idLocal/producto').post(Local.nuevoProductoLocal);
router.route('/local/:idLocal/productos').get(Local.getPorductosLocal);
router.route('/local/:idLocal/:idProducto').delete(Local.eliminarProductoLocal);
router.route('/local/:idLocal/:idUsuario/pedido').post(Local.nuevoPedidoLocal);
router.route('/local/:idLocal/pedidos').get(Local.getPedidos);

//consultas de carrito local
router.route('/carritoEmpresa/:idPedido').put(CarritoEmpresa.actualizar);
router.route('/carritoEmpresa/:idPedido').get(CarritoEmpresa.getPedido);

//consultas del producto
router.route('/producto/productos').get(Producto.getPorductos);
router.route('/producto/:nombre').get(Producto.getProducto);
router.route('/producto/:idProducto').put(Producto.actualizar);

//consultas del usuario
router.route('/usuario').post(Usuario.nuevoUsuario);
router.route('/usuario/:idUsuario/empresa').post(Usuario.nuevoEmpresaUsuario);
router.route('/usuario/:nickname').get(Usuario.getUsuario);
router.route('/usuario/:idUsuario/empresa').get(Usuario.getEmpresa);

//consultas de empresa
router.route('/empresa/:idEmpresa/local').post(Empresa.nuevoLocalEmpresa);

module.exports = router;