import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesComponent } from './cases.component';
import { CasesFormComponent } from './components/cases-form/cases-form.component';
import { CasesDetailsComponent } from './components/cases-details/cases-details.component';

const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    data: { title: 'Casos' },
  },
  {
    path: 'add-case',
    component: CasesFormComponent,
    data: { title: 'Agregar Caso' },
  },
  {
    path: 'edit/:id',
    component: CasesFormComponent,
    data: { title: 'Editar Caso' },
  },
  {
    path: 'details/:id',
    component: CasesDetailsComponent,
    data: { title: 'Detalles del Caso' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesRoutingModule {}
