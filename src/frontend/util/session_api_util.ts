import axios from 'axios';

interface SigninUser {
    username: string,
    password: string
}

export const login = (user: SigninUser) => {
    return axios({
        method: 'post',
        url: '/api/users/login',
        data: user
    })
}

export const signup = (user: object) => {
    return axios({
        method: 'post',
        url: '/api/users/register',
        data: user
    })
}

export const setAuthToken = (token: string | boolean):void => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}