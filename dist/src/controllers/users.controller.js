"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.send('users');
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    res.send('user' + req.params.id);
};
exports.getUser = getUser;
// export const createUser = (req: Request, res: Response) => {
//     res.send('user' + req.params.id);
// }
