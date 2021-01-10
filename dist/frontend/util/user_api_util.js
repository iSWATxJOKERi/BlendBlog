"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const axios_1 = __importDefault(require("axios"));
const getUsers = () => {
    return axios_1.default({
        method: 'get',
        url: '/api/users/all'
    });
};
exports.getUsers = getUsers;
