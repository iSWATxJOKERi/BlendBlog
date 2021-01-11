"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favorites = void 0;
const favorites = (parent) => {
    const favoritesContainer = document.createElement('div');
    favoritesContainer.setAttribute('id', 'favorites-container');
    const favoritesHeader = document.createElement('h2');
    favoritesHeader.classList.add('favorites-header');
    favoritesHeader.innerHTML = "Favorites &#x2764;";
    //appends to parent
    favoritesContainer.appendChild(favoritesHeader);
    parent.appendChild(favoritesContainer);
};
exports.favorites = favorites;
