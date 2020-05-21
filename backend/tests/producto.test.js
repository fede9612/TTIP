const mongoose = require('mongoose');
const Producto = require('../src/models/producto');
const productoData = { nombre: 'Cocacola', precio: 20, cantidad: 50, local: "5ec2e7fe1ce10a11cdd876f9" }

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
        const validProducto = new Producto(productoData);
        const savedProducto = await validProducto.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedProducto._id).toBeDefined();
        expect(savedProducto.nombre).toBe(productoData.nombre);
        expect(savedProducto.precio).toBe(productoData.precio);
        expect(savedProducto.cantidad).toBe(productoData.cantidad);
        // expect(savedProducto.local).toBe(productoData.local);
    });

    
})