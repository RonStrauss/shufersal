export interface Address extends AddressBase {
  id: string;
  saved: true;
}

export interface AddressBase {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
