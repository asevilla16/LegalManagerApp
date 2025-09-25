import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientsFormComponent } from './components/clients-form/clients-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsComponent, ClientsTableComponent, ClientsFormComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ClientsModule {}
