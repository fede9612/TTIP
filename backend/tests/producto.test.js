const mongoose = require('mongoose');
const Producto = require('../src/models/producto').Producto;
const Local = require('../src/models/local');
const productoData = { nombre: 'Cocacola', precio: 20, cantidad: 50}
const productoData2 = { nombre: 'Pepsi', precio: 15, cantidad: 50}
const localData = { nombre:"Local de ropa", direccion: "Av. Alem 1323"}

describe('Producto Model Test', () => {

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
    });

    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close()
        done()
      })

    it('Guardar Producto correctamente con local', async () => {
        await validLocal.save();
        validProducto.local = validLocal;
        const savedProducto = await validProducto.save();
        expect(savedProducto._id).toBeDefined();
        expect(savedProducto.nombre).toBe(productoData.nombre);
        expect(savedProducto.precio).toBe(productoData.precio);
        expect(savedProducto.cantidad).toBe(productoData.cantidad);
        expect(savedProducto.local.nombre).toBe(localData.nombre);
    });

    it('Guardar 2 Productos correctamente y consultarlos', async () => {
        await validProducto.save();
        await validProducto2.save();
        const produtos = await Producto.find();
        expect(produtos.length).toBe(2);
    });

    
})