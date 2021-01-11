import { User } from "../models/User";

export const postsIndexView = async (arr: any[]) => {
    let result = [];
    for(let i: number = 0; i < arr.length; i++) {
        const user =  await <any>User.findById(arr[i].blogger_id);
        result.push(Object.assign({ blogger: user.rows[0] }, arr[i]))
    }
    return result;
}

export const postShowView = (arr: any[]) => {
    const user =  <any>User.findById(arr[0].blogger_id);
    return Object.assign({ blogger: user.rows[0] }, arr[0]);
}