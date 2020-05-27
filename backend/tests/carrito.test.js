const mongoose = require('mongoose');
const Producto = require('../src/models/producto').Producto;
const Local = require('../src/models/local');
const Usuario = require('../src/models/usuario').Usuario;
const Carrito = require('../src/models/carritoEmpresa').Carrito;
const productoData = { nombre: 'Cocacola2', precio: 20, cantidad: 50}
const productoData2 = { nombre: 'Pepsi', precio: 15, cantidad: 50}
const usuarioData = {mail: "pepe@gmail.com"}
const localData = { nombre:"Local de ropa", direccion: "Av. Alem 1323"}

describe('Carrito Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        validLocal = new Local(localData);
        validProducto = new Producto(productoData);
        validProducto2 = new Producto(productoData2);
        validUsuario = new Usuario(usuarioData);
    });

    afterAll(async done => {
        // Closing the DB connection allows Jest to exit successfully.
        await Producto.collection.drop();
        await Usuario.collection.drop();
        await Carrito.collection.drop();
        await Local.collection.drop();
        mongoose.connection.close();
        done();
      })

    it('Guardar pedido correctamente en el local', async () => {
        const savedLocal = await validLocal.save();
        const savedProducto = await validProducto.save();
        savedLocal.productos.push(savedProducto);
        const savedUsuario = await validUsuario.save();
        const carrito = new Carrito();
        carrito.local = savedLocal;
        carrito.usuarioDelPedido = savedUsuario;
        carrito.pedidos = [savedProducto];
        const savedCarrito = await carrito.save();
        expect(savedCarrito._id).toBeDefined();
        expect(savedCarrito.pedidos.length).toBe(1);
        expect(savedCarrito.local._id).toBe(savedLocal._id);
        expect(savedCarrito.usuarioDelPedido.mail).toBe(usuarioData.mail);
        expect(savedCarrito.pendiente).toBe(true);
    });

    
})