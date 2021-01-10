"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearInputs = void 0;
const clearInputs = (elements) => {
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = "";
    }
};
exports.clearInputs = clearInputs;
