"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const users_controller_1 = require("../../controllers/users.controller");
router.get("/users/all", users_controller_1.getUsers);
router.get("/users/:id", users_controller_1.getUser);
// router.post("/users/register")
exports.default = router;