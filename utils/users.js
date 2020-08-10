const users = [];

function userJoin(id, note) {
  const user = { id, note };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const user = users[index];
    users.splice(index, 1);
    return user;
  }
}

function getNoteUsers(note) {
  return users.filter(user => user.note === note);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getNoteUsers
}
