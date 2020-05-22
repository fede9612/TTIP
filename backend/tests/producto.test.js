const {MongoClient} = require('mongodb');
const Producto = require('../src/models/producto');
const productoData = { nombre: 'Cocacola', precio: 20, cantidad: 50, local: "5ec2e7fe1ce10a11cdd876f9" }

describe('Producto Model Test', () => {

    beforeAll(async () => {
        connection = await MongoClient.connect("mongodb://localhost/", {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        db = await connection.db("anydirec");
      });
    
      afterAll(async () => {
        await connection.close();
        await db.close();
      });

    it('Guardar Producto correctamente', async () => {
        const productos = db.collection('productos');
        await productos.insertOne(productoData);
        const savedProducto = await productos.findOne(productoData);
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedProducto._id).toBeDefined();
        expect(savedProducto.nombre).toBe(productoData.nombre);
        expect(savedProducto.precio).toBe(productoData.precio);
        expect(savedProducto.cantidad).toBe(productoData.cantidad);
        // expect(savedProducto.local).toBe(productoData.local);
    });

    
})