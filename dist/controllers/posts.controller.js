"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const database_1 = require("../database");
const Post_1 = require("../models/Post");
const post_views_1 = require("../views/post_views");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Post_1.Post.find();
        const result = yield post_views_1.postsIndexView(response.rows, req.params.cu);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield Post_1.Post.findById(id);
        const result = yield post_views_1.postShowView(response.rows);
        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(500).json('Internal Server Error');
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, isValid } = Post_1.Post.checkPost(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { title, body, blogger_id } = req.body;
    try {
        yield database_1.pool.query('INSERT INTO posts (title, body, blogger_id) VALUES ($1, $2, $3)', [title, body, blogger_id]);
        return res.status(200).json({ success: 'Post created succesfully!' });
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { errors, isValid } = Post_1.Post.checkPost(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const id = parseInt(req.params.id);
    const { title, body, blogger_id } = req.body;
    try {
        yield database_1.pool.query('UPDATE posts SET title = $1, body = $2, blogger_id = $3 WHERE id = $4', [title, body, blogger_id, id]);
        return res.status(200).json({ success: 'Post updated succesfully!' });
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield database_1.pool.query('DELETE FROM posts WHERE id = $1', [id]);
        return res.status(200).json({ success: 'Post deleted succesfully!' });
    }
    catch (e) {
        return res.status(500).json(e.stack);
    }
});
exports.deletePost = deletePost;
