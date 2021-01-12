"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavorite = exports.createFavorite = void 0;
const axios_1 = __importDefault(require("axios"));
const createFavorite = (post_id, favoritee_id, favoriter_id) => {
    return axios_1.default({
        method: 'post',
        url: '/api/favorites/create',
        data: {
            post_id,
            favoritee_id,
            favoriter_id
        }
    });
};
exports.createFavorite = createFavorite;
const deleteFavorite = (post_id, favoritee_id, favoriter_id) => {
    return axios_1.default({
        method: 'delete',
        url: '/api/favorites/delete',
        data: {
            post_id,
            favoritee_id,
            favoriter_id
        }
    });
};
exports.deleteFavorite = deleteFavorite;
