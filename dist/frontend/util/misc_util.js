"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.current_user = exports.clearInputs = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const clearInputs = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
};
exports.clearInputs = clearInputs;
const current_user = () => {
    const token = localStorage.getItem('jwtToken');
    return jwt_decode_1.default(token);
};
exports.current_user = current_user;
