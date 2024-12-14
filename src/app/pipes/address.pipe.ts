import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../interfaces/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(address: Address): string {
    return `${address.country}, ${address.state}, ${address.addressLine1}, ${address.addressLine2} ${address.zipCode}`;
  }

}
