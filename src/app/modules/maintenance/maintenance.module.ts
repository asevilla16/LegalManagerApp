import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { CaseTypesComponent } from './case-types/case-types.component';
import { CaseTypesFormComponent } from './case-types/case-types-form/case-types-form.component';
import { CaseStatusesComponent } from './case-statuses/case-statuses.component';
import { CaseStatusesFormComponent } from './case-statuses/case-statuses-form/case-statuses-form.component';
import { CaseStatusesTableComponent } from './case-statuses/case-statuses-table/case-statuses-table.component';
import { CaseTypesTableComponent } from './case-types/case-types-table/case-types-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './users/components/users-table/users-table.component';
import { UsersFormComponent } from './users/components/users-form/users-form.component';

@NgModule({
  declarations: [
    CaseTypesComponent,
    CaseTypesFormComponent,
    CaseStatusesComponent,
    CaseStatusesFormComponent,
    CaseStatusesTableComponent,
    CaseTypesTableComponent,
    UsersComponent,
    UsersTableComponent,
    UsersFormComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MaintenanceModule {}
