import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { pool } from '../database';
import { Post } from '../models/Post';
import { postsIndexView, postShowView } from '../views/post_views';

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await Post.find();
        const result = await postsIndexView(response.rows);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const getPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await Post.findById(id);
        const result = await postShowView(response.rows);
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
    try {
        await pool.query('INSERT INTO posts (title, body, blogger_id) VALUES ($1, $2, $3)', [title, body, blogger_id]);
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