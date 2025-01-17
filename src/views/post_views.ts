import { Favorite } from "../models/Favorite";
import { User } from "../models/User";

export const postsIndexView = async (arr: any[], cu: number | string) => {
    let result = [];
    for(let i: number = 0; i < arr.length; i++) {
        const fav = await <any>Favorite.findBy({ post_id: arr[i].id, favoriter_id: cu, favoritee_id: arr[i].blogger_id });
        const favorited = fav.rows.length > 0 ? true : false;
        const user =  await <any>User.findById(arr[i].blogger_id);
        result.push(Object.assign({ favorited, blogger: user.rows[0] }, arr[i]))
    }
    return result;
}

export const postShowView = async (arr: any[], cu: number | string) => {
    const user =  await <any>User.findById(arr[0].blogger_id);
    const fav = await <any>Favorite.findBy({ post_id: arr[0].id, favoriter_id: cu, favoritee_id: arr[0].blogger_id });
    const favorited = fav.rows.length > 0 ? true : false;
    return Object.assign({ favorited, blogger: user.rows[0] }, arr[0]);
}