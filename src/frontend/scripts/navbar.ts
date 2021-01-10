const navbar = (app: HTMLElement) => {
    //creates loggedout navbar
    const navbar: HTMLElement = document.createElement('div');
    navbar.classList.add('navbar');

    //creates logo
    const logo: HTMLElement = document.createElement('h1');
    logo.innerHTML = 'Blend Blog';
    logo.classList.add('logo');

    //appends respective elements to respective parents to navbar
    navbar.appendChild(logo);
    app.appendChild(navbar);
}

export default navbar;