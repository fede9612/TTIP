const mongoose = require('mongoose');
const Producto = require('../src/models/producto');
const Local = require('../src/models/local');
const productoData = { nombre: 'Cocacola', precio: 20, cantidad: 50}
const localData = { nombre:"Local de ropa", direccion: "Av. Alem 1323"}

describe('Producto Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect("mongodb://localhost/anydirec", { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('Guardar Producto correctamente', async () => {
        const validLocal = new Local(localData);
        await validLocal.save();
        const validProducto = new Producto(productoData);
        validProducto.local = validLocal;
        const savedProducto = await validProducto.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedProducto._id).toBeDefined();
        expect(savedProducto.nombre).toBe(productoData.nombre);
        expect(savedProducto.precio).toBe(productoData.precio);
        expect(savedProducto.cantidad).toBe(productoData.cantidad);
        expect(savedProducto.local.nombre).toBe(localData.nombre);
    });

    
})