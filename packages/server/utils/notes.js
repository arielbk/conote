"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNote = exports.getNote = exports.createNote = void 0;
var notes = [];
function createNote(id) {
    var note = { id: id, text: "" };
    notes.push(note);
    return note;
}
exports.createNote = createNote;
function getNote(id) {
    return notes.find(function (n) { return n.id === id; });
}
exports.getNote = getNote;
function editNote(_a) {
    var id = _a.id, text = _a.text;
    var note = notes.find(function (n) { return n.id === id; });
    if (note)
        note.text = text;
    return note;
}
exports.editNote = editNote;
function deleteNote(id) {
    return notes.filter(function (n) { return n.id !== id; });
}
exports.deleteNote = deleteNote;
