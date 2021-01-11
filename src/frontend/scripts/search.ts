export const searchContainer = (parent: HTMLElement) => {
    //creates container
    const search: HTMLElement = document.createElement('div');
    search.setAttribute('id', 'search');

    //creates search input box and appends to container
    const searchContainer: HTMLElement = document.createElement('div');
    searchContainer.classList.add('search-container');
    const searchHeader: HTMLElement = document.createElement('h2');
    searchHeader.classList.add('search-header');
    searchHeader.innerHTML = "Search";
    const searchInput: HTMLInputElement = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.setAttribute('placeholder', 'Search for posts by date, title, etc...');
    const searchBtn: HTMLElement = document.createElement('span');
    searchBtn.classList.add('search-btn');
    searchBtn.innerHTML = "Search";
    search.appendChild(searchHeader);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchBtn);


    //appends to parent
    search.appendChild(searchContainer);
    parent.appendChild(search);
}