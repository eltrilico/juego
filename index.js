const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Emitir un mensaje de bienvenida al nuevo usuario
  socket.emit('message', '¡Bienvenido al chat!');

  socket.on('message', (msg) => {
    console.log('Mensaje recibido:', msg);
    // Emitir el mensaje a todos los usuarios conectados, excepto al remitente
    socket.broadcast.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});