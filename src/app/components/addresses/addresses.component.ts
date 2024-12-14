import { Component, inject, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AddressPipe } from '../../pipes/address.pipe';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewAddressComponent } from '../new-address/new-address.component';
import { map, startWith } from 'rxjs';
import { Address } from '../../interfaces/address';

@Component({
  selector: 'app-addresses',
  imports: [
    AsyncPipe,
    NgFor,
    NgIf,
    AddressPipe,
    ReactiveFormsModule,
    NewAddressComponent,
  ],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  constructor() {}

  private address = inject(AddressService);
  private fb = inject(FormBuilder);
  addresses$ = this.address.getAddresses();

  form = this.fb.group({
    addressSelected: [<Address | 'new-address' | null>null],
  });

  shouldDisplayNewAddressComponent$ =
    this.form.controls.addressSelected.valueChanges.pipe(
      map((address) => address === 'new-address'),
      startWith(false)
    );

  ngOnInit(): void {
    // this.form.controls.addressSelected.valueChanges.subscribe(console.log)
    console.log('AddressesComponent initialized');
  }
}
