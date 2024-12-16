import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address, AddressBase } from '../interfaces/address';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoadState } from '../interfaces/load-state';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly request = inject(RequestService);
  constructor() {}

  private readonly addresses$ = new BehaviorSubject<Address[]>([]);
  private readonly countries$ = new BehaviorSubject<string[]>([]);
  private readonly states$ = new BehaviorSubject<string[]>([]);

  init() {
    this.refreshAddresses();
  }

  getAddresses() {
    return this.addresses$.asObservable();
  }

  getCountries() {
    return this.countries$.asObservable();
  }

  getStates() {
    return this.states$.asObservable();
  }

  refreshAddresses() {
    this.request.get<Address[]>(`address`).subscribe((addresses) => {
      this.addresses$.next(addresses);
    });
  }
  initiateRefreshAddresses() {
    this.refreshAddresses();
  }

  refreshCountries() {
    this.request.get<string[]>(`address/countries`).subscribe((countries) => {
      this.countries$.next(countries);
    });
  }

  refreshStates(country: string) {
    this.request
      .get<string[]>(`address/states/${country}`)
      .subscribe((states) => {
        this.states$.next(states);
      });
  }

  clearStates() {
    this.states$.next([]);
  }

  selectAddress(address: Address) {
    return this.request.put<Address>(`address/select/${address.id}`, null);
  }

  createAddress(address: Address) {
    return this.request.post<Address>(`address`, address);
  }

  createAddressBody(address: Partial<AddressBase>): Address {
    const addressLine2 = address.addressLine2 || '';
    const addressLine1 = address.addressLine1 || '';
    const city = address.city || '';
    const state = address.state || '';
    const zipCode = address.zipCode || '';
    const country = address.country || '';
    return {
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      id: '',
      saved: true,
    };
  }
}
