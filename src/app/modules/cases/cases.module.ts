import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { CasesComponent } from './cases.component';
import { CasesTableComponent } from './components/cases-table/cases-table.component';
import { CasesFormComponent } from './components/cases-form/cases-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasesDetailsComponent } from './components/cases-details/cases-details.component';

@NgModule({
  declarations: [CasesComponent, CasesTableComponent, CasesFormComponent, CasesDetailsComponent],
  imports: [CommonModule, CasesRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CasesModule {}
