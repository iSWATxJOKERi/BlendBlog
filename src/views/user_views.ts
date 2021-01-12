import { QueryResult } from "pg";
import { pool } from "../database";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";

export const userFavoritesView = async (cu: number | string) => {
    let posts: QueryResult = await pool.query('SELECT * FROM posts JOIN favorites ON post_id = posts.id WHERE favoriter_id = $1', [cu]);
    if(posts.rows.length < 1) {
        return "Favorite some posts to see them here!"
    } else {
        let result = [];
        for(let i: number = 0; i < posts.rows.length; i++) {
            const fav = await <any>Favorite.findBy({ post_id: posts.rows[i].post_id, favoriter_id: cu, favoritee_id: posts.rows[i].blogger_id });
            const favorited = fav.rows.length > 0 ? true : false;
            const user =  await <any>User.findById(posts.rows[i].blogger_id);
            result.push(Object.assign({ favorited, blogger: user.rows[0] }, posts.rows[i]));
        }
        return result;
    }
}