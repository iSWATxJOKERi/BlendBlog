"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.send('users');
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    res.send('user' + req.params.id);
};
exports.getUser = getUser;
const createUser = (req, res) => {
    res.send('user' + req.params.username);
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    res.send('user' + req.params.username);
};
exports.updateUser = updateUser;
