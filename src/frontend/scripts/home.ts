import { clearInputs } from "../util/misc_util";
import { setAuthToken } from "../util/session_api_util";
import { favorites } from "./favorites";
import { mainfeed } from "./feed";
import { searchContainer } from "./search";
import { sessionCreator } from "./session";

export const home = (app: HTMLElement) => {
    //clear inputs and add logout button to navbar
    const b1: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('session-input') as HTMLCollectionOf<HTMLInputElement>;
    clearInputs(b1);
    const logout : HTMLElement = document.createElement('span');
    logout.classList.add('logout');
    logout.innerHTML = 'Logout';
    const navbar = document.getElementsByClassName('navbar')[0] as HTMLElement;
    navbar.appendChild(logout);
    navbar.style.padding = '0 25px 0 0';

    //create main section
    const blog: HTMLElement = document.createElement('section');
    blog.classList.add('main-section');
    searchContainer(blog);
    mainfeed(blog);
    favorites(blog);

    //append elements to parent to application
    app.appendChild(blog);

    //onclick for logging out 
    logout.onclick = () => { logUserOut(logout, app, blog) }
}

function logUserOut(ele: HTMLElement, app: HTMLElement, main: HTMLElement) {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    ele.style.display = "none";
    main.style.display = "none";

    // sessionCreator(app);
    document.getElementById('sessions-container')!.style.display = "flex";
}