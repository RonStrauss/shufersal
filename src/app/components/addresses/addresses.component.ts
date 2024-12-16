import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AddressPipe } from '../../pipes/address.pipe';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewAddressComponent } from '../new-address/new-address.component';
import {
  filter,
  map,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Address } from '../../interfaces/address';
import { RequestService } from '../../services/request.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressesComponent implements OnInit, OnDestroy {
  constructor() {}

  private address = inject(AddressService);
  private request = inject(RequestService);
  private fb = inject(FormBuilder);
  addresses$ = this.address.getAddresses();

  canInteractWithAddress$ = this.request.loadState$.pipe(
    map((state) => state !== 'loading')
  );

  destroy$ = new Subject<void>();

  form = this.fb.group({
    addressSelected: [<Address | 'new-address' | null>null],
  });

  shouldDisplayNewAddressComponent$ =
    this.form.controls.addressSelected.valueChanges.pipe(
      map((address) => address === 'new-address'),
      startWith(false)
    );

  ngOnInit(): void {
    this.initiateAddressSelection();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initiateAddressSelection() {
    this.form.controls.addressSelected.valueChanges
      .pipe(
        filter((input) => input !== 'new-address' && input !== null),
        switchMap((address) => this.address.selectAddress(address)),
        takeUntil(this.destroy$)
      )
      .subscribe({ next: (input) => {} });
  }

  changeAddressSelection(address: Address) {
    this.addresses$.pipe(take(1)).subscribe((addresses) => {
      const addressPointer = addresses.find((a) => a.id === address.id);
      if (!addressPointer) return;
      this.form.controls.addressSelected.setValue(addressPointer);
    });
  }

  deleteAddress(address: Address) {
    console.log('clicked delete');
  }
}
