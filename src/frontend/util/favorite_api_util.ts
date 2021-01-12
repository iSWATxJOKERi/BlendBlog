import axios from 'axios';

export const createFavorite = (post_id: string | number, favoritee_id: string | number, favoriter_id: string | number) => {
    return axios({
        method: 'post',
        url: '/api/favorites/create',
        data: {
            post_id,
            favoritee_id,
            favoriter_id
        }
    })
}

export const deleteFavorite = (post_id: string | number, favoritee_id: string | number, favoriter_id: string | number) => {
    return axios({
        method: 'delete',
        url: '/api/favorites/delete',
        data: {
            post_id,
            favoritee_id,
            favoriter_id
        }
    })
}

export const getFavoritePosts = (id: number | string) => {
    return axios({
        method: 'get',
        url: `/api/favorites/${ id }/posts`
    })
}
