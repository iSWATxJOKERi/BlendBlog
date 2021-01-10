import { setAuthToken } from "../util/session_api_util";

export const home = (app: HTMLElement) => {
    const logout : HTMLElement = document.createElement('span');
    logout.classList.add('logout');
    logout.innerHTML = 'Logout';
    const navbar = document.getElementsByClassName('navbar')[0] as HTMLElement;
    navbar.appendChild(logout);
    navbar.style.padding = '0 25px 0 0'; 
    logout.onclick = () => { logUserOut(logout) }
}

function logUserOut(ele: HTMLElement) {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    ele.style.display = "none";
    document.getElementById('sessions-container')!.style.display = "flex";
}