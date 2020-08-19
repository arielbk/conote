import express from "express";
import http from "http";
import path from "path";
import socketio from "socket.io";

import { userJoin, getNoteUsers, userLeave } from "./utils/users";
import { createNote, editNote, getNote, deleteNote } from "./utils/notes";

const app = express();
const server = http.createServer(app);
const mainIo = socketio(server);

interface Diff {
  count: number;
  added: boolean;
  removed: boolean;
  value: string;
}

// serve static build
app.use(express.static(path.join(__dirname, "..", "client", "build")));

// route all requests to client routing
app.get("*", (req: Express.Request, res: any) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Web sockets
mainIo.on("connection", (socket) => {
  // user joins or creates a note
  socket.on("joinNote", (noteId) => {
    console.log("joining note", noteId);

    // add the new user
    const user = userJoin({ id: socket.id, noteId });
    socket.join(noteId);

    // create the note if it doesn't exist or send existing note
    const savedNote = getNote(noteId);
    if (!savedNote) createNote(socket.id);
    else socket.emit("update", savedNote.text);

    // broadcast the note users
    mainIo.to(noteId).emit("users", getNoteUsers(noteId));
  });

  // broadcast any text changes to other users
  socket.on("diff", ({ diffs, id: noteId }: { diffs: [Diff]; id: string }) => {
    console.log(JSON.stringify(diffs));
    const note = getNote(noteId) || createNote(noteId);
    let newText = "";
    if (diffs)
      diffs.forEach(({ count, added, removed, value }: Diff) => {
        if (!removed) newText += value;
      });
    editNote({ id: note.id, text: newText });
    socket.broadcast.to(note.id).emit("update", newText);
  });

  // deal with a user leaving the note
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      mainIo.to(user.noteId).emit("message", `${user.id} has left the note`);
      const noteUsers = getNoteUsers(user.noteId);
      // send users and room info -- now without the user
      if (noteUsers.length)
        mainIo.to(user.noteId).emit("users", getNoteUsers(user.noteId));
      else deleteNote(user.noteId);
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () =>
  console.log(`⚡️ [server]: Server running on port ${PORT}`)
);
