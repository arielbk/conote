const notes = [];

function createNote(id) {
  const note = { id, text: '' };
  notes.push(note);
  return note;
}

function getNote(id) {
  return notes.find(n => n.id === id);
}

function editNote(id, text) {
  const note = notes.find(n => n.id === id);
  note.text = text;
  return note;
}

function deleteNote(id) {
  return notes.filter(n => n.id !== id);
}

module.exports = {
  createNote,
  getNote,
  editNote,
  deleteNote,
}
