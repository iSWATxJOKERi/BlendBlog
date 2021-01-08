import validator from 'validator';
import validText from './validText';

interface UserRegistrationRequest {
    fullname: string,
    username: string,
    password: string,
    password2: string,
    valid: boolean
}

function validateRegistrationInput(data: UserRegistrationRequest) {
    let errors: UserRegistrationRequest = {
        fullname: "",
        username: "",
        password: "",
        password2: "",
        valid: true
    };

    data.fullname = validText(data.fullname) ? data.fullname : '';
    data.username = validText(data.username) ? data.username : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if(!validator.isLength(data.fullname, { min: 2, max: 40 })) {
        errors.fullname = "Name must be between 2 and 40 characters";
        errors.valid = false;
    }

    if(validator.isEmpty(data.fullname)) {
        errors.fullname = "Full Name field is required";
        errors.valid = false;
    }

    if(!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
        errors.valid = false;
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
        errors.valid = false;
    }
    
    if(validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password field is required";
        errors.valid = false;
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password = "Passwords must match";
        errors.valid = false;
    }

    return {
        errors,
        isValid: errors.valid
    }
}

export default validateRegistrationInput;
