import '../../../reset.scss';
import '../../../index.scss';
import { loggedInNavbar, loggedOutNavbar } from "./navbar";
import { setAuthToken } from '../util/session_api_util';
import sessionCreator from './session';

document.addEventListener("DOMContentLoaded", () => {
    const app: HTMLElement = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    if(localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
        setAuthToken(localStorage.jwtToken);
        loggedInNavbar(app);
    } else {
        loggedOutNavbar(app);
        sessionCreator(app);
    }
})