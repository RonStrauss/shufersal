import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { AddressService } from '../../services/address.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { Address } from '../../interfaces/address';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'app-new-address',
  imports: [NgFor, AsyncPipe, ReactiveFormsModule, NgIf, FormFieldComponent],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAddressComponent implements OnInit {
  private readonly address = inject(AddressService);
  private readonly fb = inject(FormBuilder);

  constructor() {}

  @Output() addressCreated = new EventEmitter<Address>();

  form = this.fb.nonNullable.group({
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
  });

  countries$ = this.address.getCountries();
  states$ = this.address.getStates();

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.address.refreshCountries();
    this.initiateFormSucsribers();
  }

  initiateFormSucsribers() {
    this.form.controls.country.valueChanges.subscribe((country) => {
      if (!country) return;
      this.form.controls.state.reset();
      this.form.controls.state.enable();
      this.address.refreshStates(country);
    });

    combineLatest([this.address.getCountries(), this.address.getStates()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([_, states]) => {
        if (!states.length) {
          this.form.controls.state.disable();
        }
      });
  }

  resetForm() {
    this.form.reset();
    this.address.clearStates();
    this.form.controls.state.disable();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(this.form);
      return;
    }

    const address = this.address.createAddressBody(this.form.value);

    this.address.createAddress(address).subscribe({
      next: (newAddress) => {
        this.resetForm();
        this.address.refreshAddresses();
        this.addressCreated.emit(newAddress);
      },
    });
  }

  showDialog() {}
}
