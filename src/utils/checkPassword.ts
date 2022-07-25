export type CheckPasswordOutput = {
    isValid: boolean;
    errorMessages: string[];
}

/**
 * Checks if password is valid
 *
 * @param {string} value Password to be tested
 * @returns {void}
 */
export const checkPassword = (value: string): CheckPasswordOutput => {

    let isValid = true;
    const errorMessages = [];

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) { // Test if string contains UpperCase character
        isValid = false;
        errorMessages.push('Password must have at least one Uppercase Character.');
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) { // Test if string contains LowerCase character
        isValid = false;
        errorMessages.push('Password must have at least one Lowercase Character.');
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) { // Test if string contains Number
        isValid = false;
        errorMessages.push('Password must contain at least one Number.');
    }

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) { // Test if string contains Special Character
        isValid = false;
        errorMessages.push('Password must contain at least one Special Symbol.');
    }

    const isValidLength = /^.{8,}$/;
    if (!isValidLength.test(value)) { // Test if string is 8 characters long
        isValid = false;
        errorMessages.push('Password must be at least 8 Characters Long.');
    }

    return { isValid, errorMessages };
};