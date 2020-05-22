const mongoose = require('mongoose');
const Usuario = require('../src/models/usuario').Usuario;
const usuarioData = { mail:'pepe@gmail.com' };

describe('Producto Model Test', () => {
    let usuario;

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        usuario = new Usuario(usuarioData);
    });

    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close()
        done()
      })

    it('Guardar Usuario correctamente', async () => {
        const savedUsuario = await usuario.save();
        expect(savedUsuario._id).toBeDefined();
        expect(savedUsuario.mail).toBe(usuarioData.mail);
    });

    
})