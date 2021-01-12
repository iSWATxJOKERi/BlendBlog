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
exports.Post = void 0;
const database_1 = require("../database");
const post_1 = require("../validation/post");
class Post {
    constructor() {
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM posts');
            return result;
        });
    }
    static findBy(category = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = Object.keys(category);
            let queries = `SELECT * FROM posts WHERE ${arr[0]} LIKE $1`;
            let parameters = [category[arr[0]]];
            for (let i = 1; i < arr.length; i++) {
                queries += (' AND ' + arr[i] + ` LIKE $${i + 1}`);
                if (arr[i] === "title") {
                    parameters.push(category.title);
                }
                else if (arr[i] === "date") {
                    parameters.push(category.date);
                }
                else {
                    parameters.push(category.username);
                }
            }
            const result = yield database_1.pool.query(queries, parameters);
            return result;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM posts WHERE id = $1', [id]);
            return result;
        });
    }
    static checkPost(post) {
        post.valid = true;
        const result = post_1.validatePost(post);
        return result;
    }
}
exports.Post = Post;
