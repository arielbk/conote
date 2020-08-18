interface User {
  id: string;
  noteId: string;
}

const users: User[] = [];

export function userJoin({ id, noteId }: User) {
  const user: User = { id, noteId };
  users.push(user);
  return user;
}

export function getCurrentUser(id: string) {
  return users.find((user) => user.id === id);
}

export function userLeave(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const user = users[index];
    users.splice(index, 1);
    return user;
  }
}

export function getNoteUsers(noteId: string) {
  return users.filter((user) => user.noteId === noteId);
}
