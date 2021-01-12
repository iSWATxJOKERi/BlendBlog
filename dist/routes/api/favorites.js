"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favorites_controller_1 = require("../../controllers/favorites.controller");
const router = express_1.Router();
router.post("/favorites/create", favorites_controller_1.createFavorite);
router.delete("/favorites/delete", favorites_controller_1.deleteFavorite);
exports.default = router;
