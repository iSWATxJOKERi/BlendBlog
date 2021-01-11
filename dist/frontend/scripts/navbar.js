"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navbar = (app) => {
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
exports.default = navbar;
