const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const { userJoin, getNoteUsers, userLeave } = require('./utils/users');
const { createNote, editNote, getNote, deleteNote } = require('./utils/notes');

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
  socket.on('joinNote', noteId => {
    console.log('joining note', noteId);

    // add the new user
    const user = userJoin(socket.id, noteId);
    socket.join(noteId);

    // create the note if it doesn't exist or send existing note
    const savedNote = getNote(noteId);
    if (!savedNote) createNote(socket.id);
    else socket.emit('update', savedNote.text)
    
    // broadcast the note users
    io.to(noteId).emit('users', getNoteUsers(noteId));
  });

  // broadcast any text changes to other users
  socket.on('diff', ({diff, id: noteId }) => {
    const note = getNote(noteId) || createNote(noteId);
    let newText = "";
    if (diff) diff.forEach(
      ({
        count,
        added,
        removed,
        value,
      }) => {
        if (!removed) newText += value;
      }
    );
    editNote(note.id, newText);
    console.log(diff, noteId);
    socket.broadcast.to(note.id).emit('update', newText);
  });

  // deal with a user leaving the note
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.note).emit(
        'message',
        `${user.username} has left the note`
       );
       const noteUsers = getNoteUsers(user.note);
       // send users and room info -- now without the user
       if (noteUsers.length) io.to(user.note).emit('users', getNoteUsers(user.note))
       else deleteNote(user.note);
      
    }
  })
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
