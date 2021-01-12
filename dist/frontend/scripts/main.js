"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../reset.scss");
require("../../../index.scss");
require("../../../main.scss");
const navbar_1 = __importDefault(require("./navbar"));
const session_api_util_1 = require("../util/session_api_util");
const session_1 = require("./session");
const home_1 = require("./home");
function currentUser() {
    return localStorage.jwtToken && localStorage.jwtToken !== 'undefined';
}
document.addEventListener("DOMContentLoaded", () => {
    const app = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    if (currentUser()) {
        session_api_util_1.setAuthToken(localStorage.jwtToken);
        navbar_1.default(app);
        session_1.sessionCreator(app);
        document.getElementById('sessions-container').style.display = "none";
        home_1.home(app);
    }
    else {
        navbar_1.default(app);
        session_1.sessionCreator(app);
    }
});
