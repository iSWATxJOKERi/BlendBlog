"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validText = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};
exports.default = validText;
