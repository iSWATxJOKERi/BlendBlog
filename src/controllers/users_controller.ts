import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
    res.send('users');
}

export const getUser = (req: Request, res: Response) => {
    res.send('user' + req.params.id);
}

export const createUser = (req: Request, res: Response) => {
    res.send('user' + req.params.id);
}