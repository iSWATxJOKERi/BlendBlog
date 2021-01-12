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
exports.Favorite = void 0;
const database_1 = require("../database");
class Favorite {
    constructor() {
    }
    static findBy(category = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = Object.keys(category);
            let queries = `SELECT * FROM favorites WHERE ${arr[0]} = $1`;
            let parameters = [category[arr[0]]];
            for (let i = 1; i < arr.length; i++) {
                queries += (' AND ' + arr[i] + ` = $${i + 1}`);
                if (arr[i] === "post_id") {
                    parameters.push(category.post_id);
                }
                else if (arr[i] === "favoriter_id") {
                    parameters.push(category.favoriter_id);
                }
                else {
                    parameters.push(category.favoritee_id);
                }
            }
            // console.log(queries);
            // console.log(parameters);
            const result = yield database_1.pool.query(queries, parameters);
            return result;
        });
    }
}
exports.Favorite = Favorite;
