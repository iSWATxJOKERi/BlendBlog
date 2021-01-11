"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchContainer = void 0;
const searchContainer = (parent) => {
    //creates container
    const search = document.createElement('div');
    search.setAttribute('id', 'search');
    //creates search input box and appends to container
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    const searchHeader = document.createElement('h2');
    searchHeader.classList.add('search-header');
    searchHeader.innerHTML = "Search";
    const searchInput = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.setAttribute('placeholder', 'Search for posts by date, title, etc...');
    const searchBtn = document.createElement('span');
    searchBtn.classList.add('search-btn');
    searchBtn.innerHTML = "Search";
    search.appendChild(searchHeader);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);
    //appends to parent
    search.appendChild(searchContainer);
    parent.appendChild(search);
};
exports.searchContainer = searchContainer;
