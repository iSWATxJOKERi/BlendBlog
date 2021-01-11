"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthToken = exports.signup = exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const login = (user) => {
    return axios_1.default({
        method: 'post',
        url: '/api/users/login',
        data: user
    });
};
exports.login = login;
const signup = (user) => {
    return axios_1.default({
        method: 'post',
        url: '/api/users/register',
        data: user
    });
};
exports.signup = signup;
const setAuthToken = (token) => {
    if (token) {
        axios_1.default.defaults.headers.common['Authorization'] = token;
    }
    else {
        delete axios_1.default.defaults.headers.common['Authorization'];
    }
};
exports.setAuthToken = setAuthToken;
