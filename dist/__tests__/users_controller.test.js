"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controller_1 = require("../controllers/users.controller");
const registration_1 = __importDefault(require("../validation/registration"));
const validText_1 = __importDefault(require("../validation/validText"));
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
describe("User Registration", () => {
    describe("validText()", () => {
        it("should be defined", () => {
            expect(validText_1.default).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(validText_1.default("Barnabas Pandy")).toBe(true);
        });
        it("should return false on invalid input", () => {
            expect(validText_1.default(" ")).toBe(false);
        });
    });
    describe("validateRegistrationInput()", () => {
        let fakeuser = {
            fullname: "Rakim Mayers",
            username: "ASAP Rocky",
            password: "rockyisthebest",
            password2: "rockyisthebest",
            valid: true
        };
        let fakeuser2 = {
            fullname: "Rakim Mayers",
            username: "",
            password: "",
            password2: "rockyisthebest",
            valid: true
        };
        let correct = {
            errors: {
                fullname: "",
                username: "",
                password: "",
                password2: "",
                valid: true
            },
            isValid: true
        };
        it("should be defined", () => {
            expect(registration_1.default).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(registration_1.default(fakeuser)).toEqual(correct);
        });
        it("should return false on invalid input", () => {
            expect(registration_1.default(fakeuser2)).toHaveProperty('isValid', false);
        });
    });
});
