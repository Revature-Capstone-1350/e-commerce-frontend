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
        expect(result.errorMessages.length).toBe(3);
        expect(result.errorMessages).toContain('Password must have at least one Uppercase Character.');
        expect(result.errorMessages).toContain('Password must have at least one Lowercase Character.');
        expect(result.errorMessages).toContain('Password must contain at least one Special Symbol.');
    });

    test('returns false with error messages if no Symbol is provided', () => {
        const result: CheckPasswordOutput = checkPassword('Password1');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).toBe(1);
        expect(result.errorMessages).toContain('Password must contain at least one Special Symbol.');
    });

    test('returns false with error messages if no password is less than 8', () => {
        const result: CheckPasswordOutput = checkPassword('Passw@1');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).toBe(1);
        expect(result.errorMessages).toContain('Password must be at least 8 Characters Long.');
    });

    test('returns false with error messages if no number is provided', () => {
        const result: CheckPasswordOutput = checkPassword('Password@');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).toBe(1);
        expect(result.errorMessages).toContain('Password must contain at least one Number.');
    });

    test('returns false with error messages if no lowercase character is provided', () => {
        const result: CheckPasswordOutput = checkPassword('PASSWORD@1');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).toBe(1);
        expect(result.errorMessages).toContain('Password must have at least one Lowercase Character.');
    });

    test('returns false with error messages if no uppercase character is provided', () => {
        const result: CheckPasswordOutput = checkPassword('password@1');
        expect(result.isValid).toBe(false);
        expect(result.errorMessages.length).toBe(1);
        expect(result.errorMessages).toContain('Password must have at least one Uppercase Character.');
    });
});
