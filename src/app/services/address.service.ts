import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../interfaces/address';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http = inject(HttpClient);
  constructor() {}

  addresses$ = new BehaviorSubject<Address[]>([]);

  init() {
      // console.log('skipping init');
      // return;
    this.http
      .get<Address[]>(`${environment.apiUrl}/api/address`)
      .subscribe((addresses) => {
        this.addresses$.next(addresses);
      });
  }

  getAddresses() {
    return this.addresses$.asObservable();
  }
}
