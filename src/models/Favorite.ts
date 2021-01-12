import { QueryResult } from "pg";
import { pool } from "../database";

export class Favorite {
    constructor() {
    }

    static async findBy(category: any = {}) {
        let arr: string[] = Object.keys(category);
        let queries: string = `SELECT * FROM favorites WHERE ${ arr[0] } LIKE $1`;
        let parameters: any[] = [category[arr[0]]];
        for(let i: number = 1; i < arr.length; i++) {
            queries += (' AND ' + arr[i] + ` = $${ i + 1 }`);
            if(arr[i] === "post_id") {
                parameters.push(category.post_id)
            } else if(arr[i] === "favoriter_id") {
                parameters.push(category.favoriter_id)
            } else {
                parameters.push(category.favoritee_id)
            }
        }
        const result: QueryResult = await pool.query(queries, parameters);
        return result;
    }
}