import jwt_decode from 'jwt-decode';

export const clearInputs = (elements: HTMLCollectionOf<HTMLInputElement>) => {
    for(let i: number = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}

export const current_user = (): object => {
    const token = localStorage.getItem('jwtToken')!;
    return jwt_decode(token);
}

export const notice = (message: any) => {
    const app: HTMLElement = document.getElementById('application')!;
    const notify: HTMLElement = document.createElement('span');
    notify.setAttribute('id', 'notice');
    notify.innerHTML = `${ message }`;
    app.appendChild(notify);
    const removeNotice = setTimeout(() => {
        removeParentAndChildren(notify, removeNotice);
    }, 4500)
}

export const removeParentAndChildren = (element: HTMLElement, id?: any) => {
    while(element.lastChild) {
        element.removeChild(element.lastChild);
    }
    element.remove();
    if(id) {
        clearTimeout(id);
    }
}

export const removeChildren = (element: HTMLElement) => {
    while(element.lastChild) {
        element.removeChild(element.lastChild);
    }
}

const MONTHS: any = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}

export const dateConverter = (uglyDate: Date) => {
    let month = uglyDate.getMonth();
    let day = uglyDate.getDate();
    let year = uglyDate.getFullYear();

    return MONTHS[month] + ` ${ day },` + ` ${ year }`
}