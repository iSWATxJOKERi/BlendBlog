"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const validText_1 = __importDefault(require("./validText"));
function validateRegistrationInput(data) {
    let errors = {
        fullname: "",
        username: "",
        password: "",
        password2: "",
        valid: true
    };
    data.fullname = validText_1.default(data.fullname) ? data.fullname : '';
    data.username = validText_1.default(data.username) ? data.username : '';
    data.password = validText_1.default(data.password) ? data.password : '';
    data.password2 = validText_1.default(data.password2) ? data.password2 : '';
    if (!validator_1.default.isLength(data.fullname, { min: 2, max: 40 })) {
        errors.fullname = "Name must be between 2 and 40 characters";
        errors.valid = false;
    }
    if (validator_1.default.isEmpty(data.fullname)) {
        errors.fullname = "Full Name field is required";
        errors.valid = false;
    }
    if (!validator_1.default.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
        errors.valid = false;
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = "Password field is required";
        errors.valid = false;
    }
    if (validator_1.default.isEmpty(data.password2)) {
        errors.password2 = "Confirm Password field is required";
        errors.valid = false;
    }
    if (!validator_1.default.equals(data.password, data.password2)) {
        errors.password = "Passwords must match";
        errors.valid = false;
    }
    return {
        errors,
        isValid: errors.valid
    };
}
exports.default = validateRegistrationInput;
