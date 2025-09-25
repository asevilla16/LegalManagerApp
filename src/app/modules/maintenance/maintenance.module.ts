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

@NgModule({
  declarations: [
    CaseTypesComponent,
    CaseTypesFormComponent,
    CaseStatusesComponent,
    CaseStatusesFormComponent,
    CaseStatusesTableComponent,
    CaseTypesTableComponent,
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MaintenanceModule {}
