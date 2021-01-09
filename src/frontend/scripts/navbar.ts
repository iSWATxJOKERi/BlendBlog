function navbar(app: HTMLElement) {
    const navbar: HTMLElement = document.createElement('div');
    navbar.classList.add('navbar');
    app.appendChild(navbar);
}

export default navbar;