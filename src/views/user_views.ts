import { QueryResult } from "pg";
import { pool } from "../database";
import { postsIndexView } from "./post_views";

export const userFavoritesView = async (cu: number | string) => {
    let posts: QueryResult = await pool.query('SELECT * FROM posts JOIN favorites ON post_id = posts.id WHERE favoriter_id = $1', [cu]);
    if(posts.rows.length < 1) {
        return "Favorite some posts to see them here!"
    } else {
        let result = await postsIndexView(posts.rows, cu);
        return result;
    }
}