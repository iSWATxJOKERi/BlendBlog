import validator from 'validator';
import validText from './validText';

export interface UserLoginRequest {
    username: string,
    password: string,
    valid: boolean
}

export const validateLoginInput = (data: UserLoginRequest) => {
    let errors: UserLoginRequest = {
        username: "",
        password: "",
        valid: true
    };

    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';

    if(validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
        errors.valid = false;
    }

    if(validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
        errors.valid = false;
    }

    return {
        errors,
        isValid: errors.valid
    }
}