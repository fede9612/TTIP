server = require("./server")
Producto = require("./src/Producto.js")

mongoConnection = require("./src/mongo/mongoConnection")
Home = require("./src/mongo/mongoHome")
mongoConnection.connect( (db) => {
    productoHome = new Home("productos", db)    
    server.register(productoHome)
    // producto1 = new Producto("Alfajor", 40, 100, "Los amigos")
    // productoHome.insert(producto1);
    server.init();
})
