const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const router = require('./router');
const Sala = require('./src/models/sala').Sala;
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
    var sala = await Sala.findOne({room: room});
    if(sala == null){
      sala = new Sala();
      sala.room = room;
      await sala.save();
    }
    console.log(sala);
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} ingresó` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log(message)
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