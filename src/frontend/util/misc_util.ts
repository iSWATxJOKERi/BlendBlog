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
    notify.innerHTML = `${ message.success }`;
    app.appendChild(notify);
    const removeNotice = setTimeout(() => {
        removeParentAndChildren(notify);
    }, 4500)
    clearTimeout(removeNotice);
}

export const removeParentAndChildren = (element: HTMLElement) => {
    while(element.lastChild) {
        element.removeChild(element.lastChild);
    }
    element.remove();
}

export const removeChildren = (element: HTMLElement) => {
    while(element.lastChild) {
        element.removeChild(element.lastChild);
    }
}