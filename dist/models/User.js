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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const database_1 = require("../database");
const login_1 = require("../validation/login");
const registration_1 = require("../validation/registration");
class User {
    constructor({ fullname, username, password } = { fullname: "", username: "", password: "" }) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM users');
            return result;
        });
    }
    static findBy(category = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = Object.keys(category);
            let queries = `SELECT * FROM users WHERE ${arr[0]} = $1`;
            let parameters = [category[arr[0]]];
            for (let i = 1; i < arr.length; i++) {
                queries += (' AND ' + arr[i] + ` = $${i + 1}`);
                if (arr[i] === "username") {
                    parameters.push(category.username);
                }
                else if (arr[i] === "fullname") {
                    parameters.push(category.fullname);
                }
                else {
                    parameters.push(category.password);
                }
            }
            const result = yield database_1.pool.query(queries, parameters);
            return result;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
            return result;
        });
    }
    static checkUserRegistration(user) {
        user.valid = true;
        const result = registration_1.validateRegistrationInput(user);
        return result;
    }
    static checkUserLogin(user) {
        user.valid = true;
        const result = login_1.validateLoginInput(user);
        return result;
    }
}
exports.User = User;
