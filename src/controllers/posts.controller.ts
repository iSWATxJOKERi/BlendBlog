import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import { dateConverter } from '../frontend/util/misc_util';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { postsIndexView, postShowView } from '../views/post_views';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await Post.find();
        const result = await postsIndexView(response.rows, req.params.cu);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const getPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const prms = req.params.id.split("-");
        const id = parseInt(prms[0]);
        const response: QueryResult = await Post.findById(id);
        const result = await postShowView(response.rows, parseInt(prms[1]));
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json('Internal Server Error');
    }
}

export const createPost = async (req: Request, res: Response) => {
    const { errors, isValid } = Post.checkPost(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const { title, body, blogger_id } = req.body;
    let username = await User.findById(blogger_id);
    let todaysdate = dateConverter(new Date());
    try {
        await pool.query('INSERT INTO posts (title, body, blogger_id, date, username) VALUES ($1, $2, $3, $4, $5)', [title, body, blogger_id, todaysdate, username.rows[0].username]);
        return res.status(200).json({ success: 'Post created succesfully!'});
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const updatePost = async (req: Request, res: Response) => {
    const { errors, isValid } = Post.checkPost(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const id = parseInt(req.params.id);
    const { title, body, blogger_id } = req.body;
    try {
        await pool.query('UPDATE posts SET title = $1, body = $2, blogger_id = $3 WHERE id = $4', [title, body, blogger_id, id]);
        return res.status(200).json({ success: 'Post updated succesfully!'});
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        return res.status(200).json({ success: 'Post deleted succesfully!'});
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const deliverSearch = async (req: Request, res: Response) => {
    const { query, cu } = req.params;
    try {
        const result: QueryResult = await Post.findBy({ date: query, username: query, title: query });
        let response = await postsIndexView(result.rows, cu);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}