const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const router = require('./router');
const Sala = require('./src/models/sala').Sala;
const Mensaje = require('./src/models/mensaje').Mensaje;
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/anydirec",()=>{
    console.log("Base de datos conectada");
});


const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.json());
app.use(cors());
app.use(router);

io.on('connect', (socket) => {

  socket.on('join', async ({ name, room }, callback) => {
    console.log(name);
    console.log(room);
    var sala = await Sala.findOne({room: room}).populate('mensajes');
    if(sala == null){
      sala = new Sala();
      sala.room = room;
      await sala.save();
    }
   
    sala.mensajes.map((mensaje) => {
      socket.emit('message', { user: mensaje.usuario, text: mensaje.contenido });
    })
    
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} ingresó` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage',async (message, callback) => {
    const user = getUser(socket.id);
    var sala = await Sala.findOne({room: user.room});
    var mensaje = new Mensaje()
    mensaje.usuario = user.name;
    mensaje.contenido = message;
    await mensaje.save();
    sala.mensajes.push(mensaje._id);
    await sala.save();

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));