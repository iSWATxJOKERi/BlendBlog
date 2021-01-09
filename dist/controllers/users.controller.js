"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.User.find();
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield User_1.User.findById(id);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, isValid } = User_1.User.checkUserRegistration(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const alreadyAUser = yield User_1.User.findBy({ username: req.body.username });
    if (alreadyAUser.rows.length > 0) {
        return res.status(400).json({ username: "A user already has this username" });
    }
    else {
        const { fullname, username, password } = req.body;
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    throw err;
                try {
                    yield database_1.pool.query('INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)', [fullname, username, hash]);
                    const newUser = yield User_1.User.findBy({ username: username });
                    const payload = { id: newUser.rows[0].id, fullname: newUser.rows[0].fullname, username: newUser.rows[0].username };
                    const secret = process.env.SECRET_OR_KEY;
                    jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { return res.json({ success: true, token: 'Bearer ' + token }); });
                }
                catch (e) {
                    return res.status(500).json('Internal Server Error');
                }
            }));
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, isValid } = User_1.User.checkUserLogin(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { username, password } = req.body;
    const user = yield User_1.User.findBy({ username: username });
    if (user.rows.length < 1) {
        return res.status(400).json({ credentials: 'Incorrect Username or Password' });
    }
    else {
        bcrypt_1.default.compare(password, user.rows[0].password).then(isMatch => {
            if (isMatch) {
                const payload = { id: user.rows[0].id, fullname: user.rows[0].fullname, username: user.rows[0].username };
                const secret = process.env.SECRET_OR_KEY;
                jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token }); });
            }
            else {
                return res.status(400).json({ credentials: 'Incorrect Username or Password' });
            }
        });
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => {
    res.send('user' + req.params.username);
};
exports.updateUser = updateUser;
