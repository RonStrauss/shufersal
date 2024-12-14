import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'checkout',
    loadComponent: () =>
      import('./components/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
  },
  { path: '**', redirectTo: 'checkout' },
];
