import axios from 'axios';

export const getUsers = () => {
    return axios({
        method: 'get',
        url: '/api/users/all'
    })
}