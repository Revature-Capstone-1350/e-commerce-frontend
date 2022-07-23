export default class ResetRquest {
    oldPassword: string;
    newPassword: string;
    newEmail: string;
    newFirstname: string;
    newLastname: string;

    constructor(oldPassword: string, newPassword: string, newEmail: string, newFirstname: string, newLastname: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.newEmail = newEmail;
        this.newFirstname = newFirstname;
        this.newLastname = newLastname;
    }
}