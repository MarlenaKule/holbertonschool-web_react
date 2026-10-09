import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

describe("getCurrentYear()", () => {
    test("returns correct year", () => {
        // Expected year
        const currentYear = () => {
            return new Date().getFullYear();
        };

        // Assert functions return value
        expect(getCurrentYear()).toBe(currentYear());
    });
});

describe("getFooterCopy()", () => {
    test("returns correct string when arg is false", () => {
        // Assert functions return value
        expect(getFooterCopy(true)).toBe("Holberton School");
    });

    test("getFooterCopy() returns correct string when arg is true", () => {
        // Assert functions return value
        expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
    });
});

describe("getLatestNotification()", () => {
    test("returns correct string", () => {
        // Assert functions return value
        expect(getLatestNotification()).toBe(
            "<strong>Urgent requirement</strong> - complete by EOD"
        );
    });
});