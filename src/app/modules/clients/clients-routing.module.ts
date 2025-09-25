import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    data: { title: 'Clientes' },
  },
  {
    path: 'add-client',
    component: ClientsFormComponent,
    data: { title: 'Agregar Cliente' },
  },
  {
    path: 'edit/:id',
    component: ClientsFormComponent,
    data: { title: 'Editar Cliente' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
