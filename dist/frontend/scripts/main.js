"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../reset.scss");
require("../../../index.scss");
const navbar_1 = require("./navbar");
const session_api_util_1 = require("../util/session_api_util");
const session_1 = __importDefault(require("./session"));
document.addEventListener("DOMContentLoaded", () => {
    const app = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    if (localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
        session_api_util_1.setAuthToken(localStorage.jwtToken);
        navbar_1.loggedInNavbar(app);
    }
    else {
        navbar_1.loggedOutNavbar(app);
        session_1.default(app);
    }
});
