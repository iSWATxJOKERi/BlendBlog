"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePost = void 0;
const validator_1 = __importDefault(require("validator"));
const validText_1 = __importDefault(require("./validText"));
const validatePost = (post) => {
    const errors = {
        title: "",
        body: "",
        valid: true
    };
    post.title = validText_1.default(post.title) ? post.title : '';
    post.body = validText_1.default(post.body) ? post.body : '';
    if (validator_1.default.isEmpty(post.title)) {
        errors.title = 'Title field is required';
        errors.valid = false;
    }
    if (!validator_1.default.isLength(post.title, { min: 1, max: 32 })) {
        errors.title = "Name must be between 1 and 32 characters";
        errors.valid = false;
    }
    if (validator_1.default.isEmpty(post.body)) {
        errors.body = 'Body field is required';
        errors.valid = false;
    }
    return {
        errors,
        isValid: errors.valid
    };
};
exports.validatePost = validatePost;
