interface Note {
  id: string;
  text: string;
}

const notes: Note[] = [];

export function createNote(id: string) {
  const note = { id, text: "" };
  notes.push(note);
  return note;
}

export function getNote(id: string) {
  return notes.find((n) => n.id === id);
}

export function editNote({ id, text }: Note) {
  const note = notes.find((n) => n.id === id);
  if (note) note.text = text;
  return note;
}

export function deleteNote(id: string) {
  return notes.filter((n) => n.id !== id);
}
