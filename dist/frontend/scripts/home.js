"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const misc_util_1 = require("../util/misc_util");
const session_api_util_1 = require("../util/session_api_util");
const home = (app) => {
    const b1 = document.getElementsByClassName('session-input');
    misc_util_1.clearInputs(b1);
    const logout = document.createElement('span');
    logout.classList.add('logout');
    logout.innerHTML = 'Logout';
    const navbar = document.getElementsByClassName('navbar')[0];
    navbar.appendChild(logout);
    navbar.style.padding = '0 25px 0 0';
    logout.onclick = () => { logUserOut(logout); };
};
exports.home = home;
function logUserOut(ele) {
    localStorage.removeItem('jwtToken');
    session_api_util_1.setAuthToken(false);
    ele.style.display = "none";
    document.getElementById('sessions-container').style.display = "flex";
}
