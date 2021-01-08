import validator from 'validator';
import validText from './validText';

interface UserLoginRequest {
    username: string,
    password: string,
    valid: boolean
}

function validateLoginInput(data: UserLoginRequest) {
    let errors: UserLoginRequest = {
        username: "",
        password: "",
        valid: true
    };
}