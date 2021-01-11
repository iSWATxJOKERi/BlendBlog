import jwt_decode from 'jwt-decode';

export const clearInputs = (elements: HTMLCollectionOf<HTMLInputElement>) => {
    for(let i: number = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
}

export const current_user = () => {
    const token = localStorage.getItem('jwtToken')!;
    return jwt_decode(token);
}