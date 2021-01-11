"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
const users_controller_1 = require("../../controllers/users.controller");
router.get("/users/current", passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        username: req.body.username
    });
});
router.get("/users/all", users_controller_1.getUsers);
router.get("/users/:id", users_controller_1.getUser);
router.post("/users/register", users_controller_1.createUser);
router.post("/users/login", users_controller_1.loginUser);
router.patch("users/:id", users_controller_1.updateUser);
exports.default = router;
