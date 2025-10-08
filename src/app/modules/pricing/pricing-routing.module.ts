import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pricing.component';

const routes: Routes = [
  {
    path: '',
    component: PricingComponent,
    data: { title: 'Planes y precios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingRoutingModule {}
