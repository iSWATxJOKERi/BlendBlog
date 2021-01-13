import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await User.find();
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json('Internal Server Error');
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = parseInt(req.params.id);
        const response: QueryResult = await User.findById(id);
        return res.status(200).json(response.rows);
    } catch (e) {
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { errors, isValid } = User.checkUserRegistration(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const alreadyAUser: QueryResult = await User.findBy({ username: req.body.username });
    if(alreadyAUser.rows.length > 0) {
        return res.status(400).json({ username: "A user already has this username" })
    } else {
        const { fullname, username, password } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) throw err;
                try {
                    await pool.query('INSERT INTO users (fullname, username, password) VALUES ($1, $2, $3)', [fullname, username, hash]);
                    const newUser: QueryResult = await User.findBy({ username: username });
                    const payload = { id: newUser.rows[0].id, fullname: newUser.rows[0].fullname, username: newUser.rows[0].username };
                    const secret = <Secret>process.env.SECRET_OR_KEY;
                    jwt.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { return res.json({ success: true, token: 'Bearer ' + token })});
                } catch (e) {
                    return res.status(500).json(e.detail);
                }
            })
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { errors, isValid } = User.checkUserLogin(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    const { username, password } = req.body;

    const user: QueryResult = await User.findBy({ username: username });
    if(user.rows.length < 1) {
        return res.status(400).json({ username: 'Incorrect Username or Password' });
    } else {
        bcrypt.compare(password, user.rows[0].password).then(isMatch => {
            if(isMatch) {
                const payload = { id: user.rows[0].id, fullname: user.rows[0].fullname, username: user.rows[0].username };
                const secret = <Secret>process.env.SECRET_OR_KEY;
                jwt.sign(payload, secret, { expiresIn: '365d' }, (err, token) => { res.json({ success: true, token: 'Bearer ' + token })});
            } else {
                return res.status(400).json({ username: 'Incorrect Username or Password' });
            }
        })
    }
}

export const updateUser = (req: Request, res: Response) => {
    res.send('user' + req.params.username);
}