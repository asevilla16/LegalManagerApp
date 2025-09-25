import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseTypesComponent } from './case-types/case-types.component';
import { CaseStatusesComponent } from './case-statuses/case-statuses.component';
import { CaseTypesFormComponent } from './case-types/case-types-form/case-types-form.component';
import { CaseStatusesFormComponent } from './case-statuses/case-statuses-form/case-statuses-form.component';

const routes: Routes = [
  {
    path: 'case-types',
    component: CaseTypesComponent,
    data: { title: 'Tipos de Caso' },
  },
  {
    path: 'case-statuses',
    component: CaseStatusesComponent,
    data: { title: 'Estados de Caso' },
  },
  {
    path: 'add-new-case-type',
    component: CaseTypesFormComponent,
    data: { title: 'Agregar Tipo de Caso' },
  },
  {
    path: 'add-new-case-status',
    component: CaseStatusesFormComponent,
    data: { title: 'Agregar Estado de Caso' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
