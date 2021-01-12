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
exports.postShowView = exports.postsIndexView = void 0;
const Favorite_1 = require("../models/Favorite");
const User_1 = require("../models/User");
const postsIndexView = (arr, cu) => __awaiter(void 0, void 0, void 0, function* () {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const fav = yield Favorite_1.Favorite.findBy({ post_id: arr[i].id, favoriter_id: cu, favoritee_id: arr[i].blogger_id });
        const favorited = fav.rows.length > 0 ? true : false;
        const user = yield User_1.User.findById(arr[i].blogger_id);
        result.push(Object.assign({ favorited, blogger: user.rows[0] }, arr[i]));
    }
    return result;
});
exports.postsIndexView = postsIndexView;
const postShowView = (arr) => {
    const user = User_1.User.findById(arr[0].blogger_id);
    return Object.assign({ blogger: user.rows[0] }, arr[0]);
};
exports.postShowView = postShowView;
