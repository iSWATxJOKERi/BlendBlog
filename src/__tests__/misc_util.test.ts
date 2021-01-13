import { dateConverter } from "../frontend/util/misc_util"

describe("dateConverter()", () => {
    let todaysDate: number = 1610500136504; 
    it("should be defined", () => {
        expect(dateConverter).toBeDefined();
    });
    it("should return an instance of a Date object as Month Day, Year", () => {
        expect(dateConverter(new Date(todaysDate))).toEqual("January 12, 2021");
    });
})