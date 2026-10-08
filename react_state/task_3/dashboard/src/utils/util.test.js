import { getFullYear, getFooterCopy, getLatestNotification }from './util';

describe('utilsTest', () => {
    describe('yearTest', () => {
        it ('should return the same year', () => {
            expect(getFullYear()).toEqual(new Date().getFullYear());
        });
    });
    describe('footerTest', () => {
        it ('should return the correct string when argument is true', () => {
            expect(getFooterCopy(true)).toEqual('Holberton School');
        });
        it ('should return the correct string when argument is false', () => {
            expect(getFooterCopy(false)).toEqual('Holberton School main dashboard');
        });
    });
    describe('notificationTest', () => {
        it ('should check the returned string', () => {
            expect(getLatestNotification()).toEqual('<strong>Urgent requirement</strong> - complete by EOD');
        });
    });
})