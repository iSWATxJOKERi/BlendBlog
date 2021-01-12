import { pool } from "../database";
import { Request, Response } from 'express';

export const createFavorite = async (req: Request, res: Response) => {
    const { post_id, favoriter_id, favoritee_id } = req.body;
    try {
        await pool.query('INSERT INTO favorites (post_id, favoriter_id, favoritee_id) VALUES ($1, $2, $3)', [post_id, favoriter_id, favoritee_id]);
        return res.status(200).json({ success: 'Favorite created succesfully!'});
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}

export const deleteFavorite = async (req: Request, res: Response) => {
    const { post_id, favoriter_id, favoritee_id } = req.body;
    try {
        await pool.query('DELETE FROM favorites WHERE post_id = $1 AND favoriter_id = $2 AND favoritee_id = $3', [post_id, favoriter_id, favoritee_id]);
        return res.status(200).json({ success: 'Favorite removed succesfully!'});
    } catch (e) {
        return res.status(500).json(e.stack);
    }
}