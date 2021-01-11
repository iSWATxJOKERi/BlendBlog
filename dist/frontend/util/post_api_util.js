"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const axios_1 = __importDefault(require("axios"));
const getPosts = () => {
    return axios_1.default({
        method: 'GET',
        url: '/api/posts/all'
    });
};
exports.getPosts = getPosts;
const getPost = (id) => {
    return axios_1.default({
        method: 'GET',
        url: `/api/posts/${id}`
    });
};
exports.getPost = getPost;
const createPost = (post) => {
    return axios_1.default({
        method: 'POST',
        url: '/api/posts/create',
        data: post
    });
};
exports.createPost = createPost;
const updatePost = (id, post) => {
    return axios_1.default({
        method: 'PATCH',
        url: `/api/posts/${id}/update`,
        data: post
    });
};
exports.updatePost = updatePost;
const deletePost = (id) => {
    return axios_1.default({
        method: 'DELETE',
        url: `/api/posts/${id}/delete`
    });
};
exports.deletePost = deletePost;
