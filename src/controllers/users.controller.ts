import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import validateRegistrationInput from '../validation/registration';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

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

export const createUser = async (req: Request, res: Response) => {
    const { errors, isValid } = validateRegistrationInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const alreadyAUser: QueryResult = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username])
    if(alreadyAUser.rows.length > 0) {
        return res.status(400).json({ username: "A user already has this username" })
    } else {
        const { fullname, username, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) throw err;
                try {
                    const newUser: QueryResult = await pool.query('INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)', [fullname, username, hash]);
                    const payload = { id: newUser.rows[0].id, fullname: newUser.rows[0].fullname, username: newUser.rows[0].username };
                    const secret = <Secret>process.env.SECRET_OR_KEY;
                    jwt.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token })});
                } catch (e) {
                    return res.status(500).json('Internal Server Error');
                }
            })
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
}

export const updateUser = (req: Request, res: Response) => {
    res.send('user' + req.params.username);
}
