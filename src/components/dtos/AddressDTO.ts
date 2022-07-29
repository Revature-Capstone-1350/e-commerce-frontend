export default class AddressDTO {
  addressId: number;
  street: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;

  constructor(
    addressId: number,
    street: string,
    street2: string,
    city: string,
    state: string,
    postalCode: string,
  ) 
  {
    this.addressId = addressId;
    this.street = street;
    this.street2 = street2;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
  }
};
