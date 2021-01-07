import { createUser, getUser, getUsers, updateUser } from "../controllers/users.controller";

describe("UsersController.ts", () => {
    it("should export a function called getUsers", () => {
        expect(getUsers).toBeDefined();
    });
    it("should export a function called getUser", () => {
        expect(getUser).toBeDefined();
    });
    it("should export a function called createUser", () => {
        expect(createUser).toBeDefined();
    });
    it("should export a function called updateUser", () => {
        expect(updateUser).toBeDefined();
    });
})

