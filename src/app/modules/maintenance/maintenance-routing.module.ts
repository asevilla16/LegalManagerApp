import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseTypesComponent } from './case-types/case-types.component';
import { CategoriesComponent } from './categories/categories.component';
import { CaseStatusesComponent } from './case-statuses/case-statuses.component';
import { CaseTypesFormComponent } from './case-types/case-types-form/case-types-form.component';
import { CaseStatusesFormComponent } from './case-statuses/case-statuses-form/case-statuses-form.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/components/users-form/users-form.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

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
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Usuarios' },
  },
  {
    path: 'add-new-user',
    component: UsersFormComponent,
    data: { title: 'Agregar Usuario' },
  },
  {
    path: 'users/edit/:id',
    component: UsersFormComponent,
    data: { title: 'Editar Usuario' },
  },
  {
    path: 'case-types/edit/:id',
    component: CaseTypesFormComponent,
    data: { title: 'Editar Tipo de Caso' },
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    data: { title: 'Materias del derecho' },
  },
  {
    path: 'add-new-category',
    component: CategoriesFormComponent,
    data: { title: 'Agregar Materia del derecho' },
  },
  {
    path: 'categories/edit/:id',
    component: CategoriesFormComponent,
    data: { title: 'Editar Materia del derecho' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
