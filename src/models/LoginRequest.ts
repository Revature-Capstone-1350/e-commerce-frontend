/**
 * LoginRequest model
 */
export default class LoginRequest {
    email: string;
    password: string;

    // constructor for LoginRequest class
    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}