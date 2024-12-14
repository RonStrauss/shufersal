import { Component, inject, OnInit } from '@angular/core';
import { AddressService } from '../../services/address.service';
import { AddressesComponent } from "../addresses/addresses.component";
import { SummaryComponent } from "../summary/summary.component";

@Component({
  selector: 'app-checkout',
  imports: [AddressesComponent, SummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {}
