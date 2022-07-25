import { checkPassword, CheckPasswordOutput } from '../utils/checkPassword';

describe('checkPassword unit tests', () => {

    test('returns true with no error messages', () => {
        const result: CheckPasswordOutput = checkPassword('Password1$');
        expect(result.isValid).toBe(true);
        expect(result.errorMessages.length).toBe(0);
    });

    test('returns false with error messages if a password of only numbers is provided', () => {
        const result: CheckPasswordOutput = checkPassword('12345678');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).not.toBe(0);
        expect(result.errorMessages).toContain('Password must have at least one Uppercase Character.');
        expect(result.errorMessages).toContain('Password must have at least one Lowercase Character.');
        expect(result.errorMessages).toContain('Password must contain at least one Special Symbol.');
    });
});
