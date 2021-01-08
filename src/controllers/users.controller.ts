import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json('Internal Server Error');
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    
}

export const updateUser = (req: Request, res: Response) => {
    res.send('user' + req.params.username);
}
