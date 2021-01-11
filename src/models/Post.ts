import { QueryResult } from "pg";
import { pool } from "../database";
import { PostRequest, validatePost } from "../validation/post";

export class Post {
    constructor() {
    }

    static async find() {
        const result: QueryResult = await pool.query('SELECT * FROM posts');
        return result;
    }

    static async findBy(category: any = {}) {
        let arr: string[] = Object.keys(category);
        let queries: string = `SELECT * FROM posts WHERE ${ arr[0] } LIKE $1`;
        let parameters: any[] = [category[arr[0]]];
        for(let i: number = 1; i < arr.length; i++) {
            queries += (' AND ' + arr[i] + ` = $${ i + 1 }`);
            if(arr[i] === "title") {
                parameters.push(category.title)
            } else if(arr[i] === "date") {
                parameters.push(category.date)
            } else {
                parameters.push(category.username)
            }
        }
        const result: QueryResult = await pool.query(queries, parameters);
        return result;
    }

    static async findById(id: number) {
        const result: QueryResult = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result;
    }

    static checkPost(post: PostRequest) {
        post.valid = true;
        const result = validatePost(post);
        return result;
    }
}

