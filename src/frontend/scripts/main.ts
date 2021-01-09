import navbar from "./navbar";
import '../../../index.scss';

document.addEventListener("DOMContentLoaded", () => {
    const app: HTMLElement = document.createElement('section');
    app.setAttribute('id', 'application');
    document.body.appendChild(app);
    navbar(app);
})