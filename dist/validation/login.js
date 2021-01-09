"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginInput = void 0;
const validator_1 = __importDefault(require("validator"));
const validText_1 = __importDefault(require("./validText"));
const validateLoginInput = (data) => {
    let errors = {
        username: "",
        password: "",
        valid: true
    };
    data.username = validText_1.default(data.username) ? data.username : '';
    data.password = validText_1.default(data.password) ? data.password : '';
    if (validator_1.default.isEmpty(data.username)) {
        errors.username = 'Username field is required';
        errors.valid = false;
    }
    if (validator_1.default.isEmpty(data.password)) {
        errors.password = 'Password field is required';
        errors.valid = false;
    }
    return {
        errors,
        isValid: errors.valid
    };
};
exports.validateLoginInput = validateLoginInput;
