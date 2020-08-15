const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const { userJoin, getNoteUsers, getCurrentUser } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// serve static build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// route all requests to client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Web sockets
io.on('connection', socket => {

  // user joins or creates a note
  socket.on('joinNote', note => {
    console.log('joining note', note);

    // add the new user
    const user = userJoin(socket.id, note);
    socket.join(note);

    // broadcast the note users
    io.to(note).emit('users', getNoteUsers(note));
  });

  // broadcast any text changes to other users
  socket.on('diff', diff => {
    const user = getCurrentUser(socket.id);
    console.log(user);
    if (user) socket.broadcast.to(user.note).emit('diff', diff);
  });

});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
