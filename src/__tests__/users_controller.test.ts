import { createUser, getUser, getUsers, updateUser } from "../controllers/users.controller";
import { validateLoginInput } from "../validation/login";
import { validateRegistrationInput } from "../validation/registration";
import validText from "../validation/validText";

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

describe("User Registration", () => {
    describe("validText()", () => {
        it("should be defined", () => {
            expect(validText).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(validText("Barnabas Pandy")).toBe(true);
        })
        it("should return false on invalid input", () => {
            expect(validText(" ")).toBe(false);
        })
    })
    describe("validateRegistrationInput()", () => {
        let fakeuser = {
            fullname: "Rakim Mayers",
            username: "ASAP Rocky",
            password: "rockyisthebest",
            password2: "rockyisthebest",
            valid: true
        }
        let fakeuser2 = {
            fullname: "Rakim Mayers",
            username: "",
            password: "",
            password2: "rockyisthebest",
            valid: true
        }
        let correct = {
            errors: {
                fullname: "",
                username: "",
                password: "",
                password2: "",
                valid: true
            },
            isValid: true
        }
        it("should be defined", () => {
            expect(validateRegistrationInput).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(validateRegistrationInput(fakeuser)).toEqual(correct);
        })
        it("should return false on invalid input", () => {
            expect(validateRegistrationInput(fakeuser2)).toHaveProperty('isValid', false);
        })
    })
})

describe("User Login", () => {
    describe("validText()", () => {
        it("should be defined", () => {
            expect(validText).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(validText("Barnabas Pandy")).toBe(true);
        })
        it("should return false on invalid input", () => {
            expect(validText(" ")).toBe(false);
        })
    })
    describe("validateLoginInput()", () => {
        let fakeuser = {
            username: "ASAP Rocky",
            password: "rockyisthebest",
            valid: true
        }
        let fakeuser2 = {
            username: "",
            password: "",
            valid: true
        }
        let correct = {
            errors: {
                username: "",
                password: "",
                valid: true
            },
            isValid: true
        }
        it("should be defined", () => {
            expect(validateLoginInput).toBeDefined();
        });
        it("should return true on valid input", () => {
            expect(validateLoginInput(fakeuser)).toEqual(correct);
        })
        it("should return false on invalid input", () => {
            expect(validateLoginInput(fakeuser2)).toHaveProperty('isValid', false);
        })
    })
})

