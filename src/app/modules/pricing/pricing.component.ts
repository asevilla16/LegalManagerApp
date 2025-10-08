import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  pricingPlans = [
    {
      name: 'Básico',
      price: 24,
      isFeatured: false,
      features: [
        { icon: 'icon-user', label: '3 Miembros' },
        { icon: 'icon-screen-smartphone', label: 'Un Dispositivo' },
        { icon: 'icon-drawar', label: '50GB Almacenamiento' },
        { icon: 'icon-refresh', label: 'Copias de Seguridad Mensuales' },
      ],
      customClass: 'b-l',
      buttonClass: 'btn btn-success waves-effect waves-light m-t-20',
    },
    {
      name: 'Avanzado',
      price: 34,
      isFeatured: false,
      features: [
        { icon: 'icon-user', label: '5 Miembros' },
        { icon: 'icon-screen-smartphone', label: 'Un Dispositivo' },
        { icon: 'icon-drawar', label: '80GB Almacenamiento' },
        { icon: 'icon-refresh', label: 'Copias de Seguridad Mensuales' },
      ],
      customClass: 'b-l',
      buttonClass: 'btn btn-success waves-effect waves-light m-t-20',
    },
    {
      name: 'Premium',
      price: 45,
      isFeatured: true,
      features: [
        { icon: 'icon-user', label: '10 Miembros' },
        { icon: 'icon-screen-smartphone', label: 'Un Dispositivo' },
        { icon: 'icon-drawar', label: '120GB Almacenamiento' },
        { icon: 'icon-refresh', label: 'Copias de Seguridad Mensuales' },
      ],
      customClass: 'featured-plan',
      buttonClass: 'btn btn-lg btn-info waves-effect waves-light m-t-20',
    },
    {
      name: 'Ultimate',
      price: 54,
      isFeatured: false,
      features: [
        { icon: 'icon-user', label: '15 Miembros' },
        { icon: 'icon-screen-smartphone', label: 'Un Dispositivo' },
        { icon: 'icon-drawar', label: '1TB Almacenamiento' },
        { icon: 'icon-refresh', label: 'Copias de Seguridad Mensuales' },
      ],
      customClass: 'b-r',
      buttonClass: 'btn btn-success waves-effect waves-light m-t-20',
    },
  ];
}
