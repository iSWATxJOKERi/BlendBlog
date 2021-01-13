import axios from 'axios';
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
interface SigninUser {
    username: string,
    password: string
}

interface SignupUser {
    fullname: string,
    username: string,
    password: string,
    password2: string
}

export const login = (user: SigninUser) => {
    return axios({
        method: 'post',
        url: '/api/users/login',
        data: user
    })
}

export const signup = (user: SignupUser) => {
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