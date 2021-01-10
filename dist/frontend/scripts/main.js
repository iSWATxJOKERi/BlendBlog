"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const navbar_1 = __importDefault(require("./navbar"));
require("../../../reset.scss");
require("../../../index.scss");
const user_api_util_1 = require("../util/user_api_util");
document.addEventListener("DOMContentLoaded", () => {
    const app = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    navbar_1.default(app);
    user_api_util_1.getUsers().then(users => {
        console.log(users);
    });
});
