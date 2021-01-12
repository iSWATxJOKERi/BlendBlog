"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const misc_util_1 = require("../util/misc_util");
const session_api_util_1 = require("../util/session_api_util");
const favorites_1 = require("./favorites");
const feed_1 = require("./feed");
const search_1 = require("./search");
const home = (app) => {
    //clear inputs and add logout button to navbar
    const b1 = document.getElementsByClassName('session-input');
    misc_util_1.clearInputs(b1);
    const logout = document.createElement('span');
    logout.classList.add('logout');
    logout.innerHTML = 'Logout';
    const navbar = document.getElementsByClassName('navbar')[0];
    navbar.appendChild(logout);
    navbar.style.padding = '0 25px 0 0';
    //create main section
    const blog = document.createElement('section');
    blog.classList.add('main-section');
    search_1.searchContainer(blog);
    feed_1.mainfeed(blog);
    favorites_1.favorites(blog);
    //append elements to parent to application
    app.appendChild(blog);
    //onclick for logging out 
    logout.onclick = () => { logUserOut(logout, app, blog); };
};
exports.home = home;
function logUserOut(ele, app, main) {
    localStorage.removeItem('jwtToken');
    session_api_util_1.setAuthToken(false);
    ele.style.display = "none";
    main.style.display = "none";
    // sessionCreator(app);
    document.getElementById('sessions-container').style.display = "flex";
}
