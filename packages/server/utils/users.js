"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNoteUsers = exports.userLeave = exports.getCurrentUser = exports.userJoin = void 0;
var users = [];
function userJoin(_a) {
    var id = _a.id, noteId = _a.noteId;
    var user = { id: id, noteId: noteId };
    users.push(user);
    return user;
}
exports.userJoin = userJoin;
function getCurrentUser(id) {
    return users.find(function (user) { return user.id === id; });
}
exports.getCurrentUser = getCurrentUser;
function userLeave(id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1) {
        var user = users[index];
        users.splice(index, 1);
        return user;
    }
}
exports.userLeave = userLeave;
function getNoteUsers(noteId) {
    return users.filter(function (user) { return user.noteId === noteId; });
}
exports.getNoteUsers = getNoteUsers;
