export default class Address {
    firstName: string;
    lastName: string;
    street: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    country: string;

    constructor(
        firstName: string,
        lastName: string,
        street: string,
        street2: string,
        city: string,
        state: string,
        zip: string,
        country: string,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }
}
