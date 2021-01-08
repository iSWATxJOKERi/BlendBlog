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
const registration_1 = __importDefault(require("../validation/registration"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
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
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        return res.status(500).json('Internal Server Error');
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, isValid } = registration_1.default(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const alreadyAUser = yield database_1.pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
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
                    const newUser = yield database_1.pool.query('INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)', [fullname, username, hash]);
                    const payload = { id: newUser.rows[0].id, fullname: newUser.rows[0].fullname, username: newUser.rows[0].username };
                    const secret = process.env.SECRET_OR_KEY;
                    jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token }); });
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
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => {
    res.send('user' + req.params.username);
};
exports.updateUser = updateUser;
