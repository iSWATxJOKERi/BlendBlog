import { QueryResult } from "pg";
import { pool } from "../database";
import { UserLoginRequest, validateLoginInput } from "../validation/login";
import { UserRegistrationRequest, validateRegistrationInput } from "../validation/registration";

export interface UserRules {
    fullname: string,
    username: string,
    password: string
}

export class User {
    fullname: string;
    username: string;
    password: string;

    constructor({ fullname, username, password }: UserRules = { fullname: "", username: "", password: "" }) {
        this.fullname = fullname;
        this.username = username;
        this.password = password;
    }

    static async find() {
        const result: QueryResult = await pool.query('SELECT * FROM users');
        return result;
    }
    
    static async findBy(category: any = {}) {
        let arr: string[] = Object.keys(category);
        let queries: string = `SELECT * FROM users WHERE ${ arr[0] } = $1`;
        let parameters: any[] = [category[arr[0]]];
        for(let i: number = 1; i < arr.length; i++) {
            queries += (' AND ' + arr[i] + ` = $${ i + 1 }`);
            if(arr[i] === "username") {
                parameters.push(category.username)
            } else if(arr[i] === "fullname") {
                parameters.push(category.fullname)
            } else {
                parameters.push(category.password)
            }
        }
        const result: QueryResult = await pool.query(queries, parameters);
        return result;
    }

    static async findById(id: number) {
        const result: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result;
    }

    static checkUserRegistration(user: UserRegistrationRequest) {
        user.valid = true;
        const result = validateRegistrationInput(user);
        return result;
    }

    static checkUserLogin(user: UserLoginRequest) {
        user.valid = true;
        const result = validateLoginInput(user);
        return result;
    }
}