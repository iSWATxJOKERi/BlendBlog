"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChildren = exports.removeParentAndChildren = exports.notice = exports.current_user = exports.clearInputs = void 0;
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
const notice = (message) => {
    const app = document.getElementById('application');
    const notify = document.createElement('span');
    notify.setAttribute('id', 'notice');
    notify.innerHTML = `${message.success}`;
    app.appendChild(notify);
    const removeNotice = setTimeout(() => {
        exports.removeParentAndChildren(notify, removeNotice);
    }, 4500);
};
exports.notice = notice;
const removeParentAndChildren = (element, id) => {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
    element.remove();
    clearTimeout(id);
};
exports.removeParentAndChildren = removeParentAndChildren;
const removeChildren = (element) => {
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
};
exports.removeChildren = removeChildren;
