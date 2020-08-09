const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// serve static build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Web sockets
io.on('connection', socket => {
  socket.emit('message', 'New user joined');

  // broadcast any text changes to other users
  socket.on('text', text => {
    socket.broadcast.emit('text', text);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));