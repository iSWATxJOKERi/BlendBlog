import axios from 'axios';
import { PostRequest } from '../../validation/post';

export const getPosts = (cu: any): any => {
    return axios({
        method: 'GET',
        url: `/api/posts/${ cu }/all`
    })
}

export const deliverPosts = (query: string, cu: number | string) => {
    return axios({
        method: 'GET',
        url: `/api/posts/search/${ query }/id/${ cu }`
    })
}

export const getPost = (id: number, current: number | string) => {
    return axios({
        method: 'GET',
        url: `/api/posts/${ id }-${ current }`
    })
}

export const createPost = (post: PostRequest) => {
    return axios({
        method: 'POST',
        url: '/api/posts/create',
        data: post
    })
}

export const updatePost = (id: number, post: PostRequest) => {
    return axios ({
        method: 'PATCH',
        url: `/api/posts/${ id }/update`,
        data: post
    })
}

export const deletePost = (id: number) => {
    return axios({
        method: 'DELETE',
        url: `/api/posts/${ id }/delete`
    })
}