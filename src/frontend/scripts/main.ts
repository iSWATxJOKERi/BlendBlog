import '../../../reset.scss';
import '../../../index.scss';
import navbar from "./navbar";
import { setAuthToken } from '../util/session_api_util';
import { sessionCreator } from './session';
import { home } from './home';

function currentUser() {
    return localStorage.jwtToken && localStorage.jwtToken !== 'undefined'
}

document.addEventListener("DOMContentLoaded", () => {
    const app: HTMLElement = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    if(currentUser()) {
        setAuthToken(localStorage.jwtToken);
        navbar(app);
        home(app);
    } else {
        navbar(app);
        sessionCreator(app);
    }
})