"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = __importDefault(require("socket.io"));
var users_1 = require("./utils/users");
var notes_1 = require("./utils/notes");
var app = express_1.default();
var server = http_1.default.createServer(app);
var mainIo = socket_io_1.default(server);
// // serve static build
// app.use(express.static(path.join(__dirname, "..", "client", "build")));
// route all requests to client routing
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "..", "client", "build", "index.html"));
});
// Web sockets
mainIo.on("connection", function (socket) {
    // user joins or creates a note
    socket.on("joinNote", function (noteId) {
        console.log("joining note", noteId);
        // add the new user
        var user = users_1.userJoin({ id: socket.id, noteId: noteId });
        socket.join(noteId);
        // create the note if it doesn't exist or send existing note
        var savedNote = notes_1.getNote(noteId);
        if (!savedNote)
            notes_1.createNote(socket.id);
        else
            socket.emit("update", savedNote.text);
        // broadcast the note users
        mainIo.to(noteId).emit("users", users_1.getNoteUsers(noteId));
    });
    // broadcast any text changes to other users
    socket.on("diff", function (_a) {
        var diffs = _a.diffs, noteId = _a.id;
        console.log(JSON.stringify(diffs));
        var note = notes_1.getNote(noteId) || notes_1.createNote(noteId);
        var newText = "";
        if (diffs)
            diffs.forEach(function (_a) {
                var count = _a.count, added = _a.added, removed = _a.removed, value = _a.value;
                if (!removed)
                    newText += value;
            });
        notes_1.editNote({ id: note.id, text: newText });
        socket.broadcast.to(note.id).emit("update", newText);
    });
    // deal with a user leaving the note
    socket.on("disconnect", function () {
        var user = users_1.userLeave(socket.id);
        if (user) {
            mainIo.to(user.noteId).emit("message", user.id + " has left the note");
            var noteUsers = users_1.getNoteUsers(user.noteId);
            // send users and room info -- now without the user
            if (noteUsers.length)
                mainIo.to(user.noteId).emit("users", users_1.getNoteUsers(user.noteId));
            else
                notes_1.deleteNote(user.noteId);
        }
    });
});
var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
    return console.log("\u26A1\uFE0F [server]: Server running on port " + PORT);
});
