import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentsComponent,
    data: { title: 'Documentos' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsRoutingModule {}
