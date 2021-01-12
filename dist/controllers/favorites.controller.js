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
exports.deleteFavorite = exports.createFavorite = void 0;
const database_1 = require("../database");
const createFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, favoriter_id, favoritee_id } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO favorites (post_id, favoriter_id, favoritee_id) VALUES ($1, $2, $3)', [post_id, favoriter_id, favoritee_id]);
        return res.status(200).json({ success: 'Favorite created succesfully!' });
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.createFavorite = createFavorite;
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, favoriter_id, favoritee_id } = req.body;
    try {
        yield database_1.pool.query('DELETE FROM favorites WHERE post_id = $1 AND favoriter_id = $2 AND favoritee_id = $3', [post_id, favoriter_id, favoritee_id]);
        return res.status(200).json({ success: 'Favorite removed succesfully!' });
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.deleteFavorite = deleteFavorite;
