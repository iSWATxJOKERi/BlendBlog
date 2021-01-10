import navbar from "./navbar";
import '../../../reset.scss';
import '../../../index.scss';
import { getUsers } from "../util/user_api_util";

document.addEventListener("DOMContentLoaded", () => {
    const app: HTMLElement = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    navbar(app);
    getUsers().then(users => {
        console.log(users);
    })
})