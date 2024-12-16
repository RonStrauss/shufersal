import { Component, inject, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AddressesComponent } from "../addresses/addresses.component";
import { SummaryComponent } from "../summary/summary.component";
import { PaymentComponent } from "../payment/payment.component";
import { ProgressTrackerComponent } from "../progress-tracker/progress-tracker.component";

@Component({
  selector: 'app-checkout',
  imports: [AddressesComponent, SummaryComponent, PaymentComponent, ProgressTrackerComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
