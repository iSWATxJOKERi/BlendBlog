"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedOutNavbar = exports.loggedInNavbar = void 0;
const loggedInNavbar = (app) => {
    //creates loggedin navbar
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    app.appendChild(navbar);
};
exports.loggedInNavbar = loggedInNavbar;
const loggedOutNavbar = (app) => {
    //creates loggedout navbar
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    //creates logo
    const logo = document.createElement('h1');
    logo.innerHTML = 'Blend Blog';
    logo.classList.add('logo');
    //appends respective elements to respective parents to navbar
    navbar.appendChild(logo);
    app.appendChild(navbar);
};
exports.loggedOutNavbar = loggedOutNavbar;
