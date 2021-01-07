"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
describe("UsersController.ts", () => {
    it("should export a function called getUsers", () => {
        expect(users_controller_1.getUsers).toBeDefined();
    });
    it("should export a function called getUser", () => {
        expect(users_controller_1.getUser).toBeDefined();
    });
    it("should export a function called createUser", () => {
        expect(users_controller_1.createUser).toBeDefined();
    });
    it("should export a function called updateUser", () => {
        expect(users_controller_1.updateUser).toBeDefined();
    });
});
