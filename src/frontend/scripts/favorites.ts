export const favorites = (parent: HTMLElement) => {
    const favoritesContainer: HTMLElement = document.createElement('div');
    favoritesContainer.setAttribute('id', 'favorites-container');

    const favoritesHeader: HTMLElement = document.createElement('h2');
    favoritesHeader.classList.add('favorites-header');
    favoritesHeader.innerHTML = "Favorites &#x2764;";

    //appends to parent
    favoritesContainer.appendChild(favoritesHeader);
    parent.appendChild(favoritesContainer);
}