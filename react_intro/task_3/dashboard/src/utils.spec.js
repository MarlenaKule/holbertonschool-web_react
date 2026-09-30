import { getCurrentYear, getFooterCopy, getLatestNotification } from "../../../task_2/dashboard/src/utils.jsx";

describe("Utils function", () => {
    test("getCurrentYear return the current year", () => {
        const year = getCurrentYear();
        const expectedYear = new Date().getFullYear();
        expect(year).toBe(expectedYear);
    });

    test("getFooterCopy() returns 'Holberton School' when true", () => {
        expect(getFooterCopy(true)).toBe("Holberton School");
    });

    test("getFooterCopy() returns 'Holberton School main dashboard' when false", () => {
        expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });

    test("getLatestNotification returns the correct string", () => {
        expect(getLatestNotification()).toBe(
            "<strong>Urgent requirement</strong> - complete by EOD"
        );
    });

});