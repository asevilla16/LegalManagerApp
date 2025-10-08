import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TemplateDocument } from '../models/template-document';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  baseUrl = environment.apiUrl + '/files';
  http = inject(HttpClient);

  getTemplateDocuments() {
    return this.http.get<TemplateDocument[]>(this.baseUrl + '/template-files');
  }

  downloadFile(fileName: string) {
    return this.http.get(this.baseUrl + '/template-file/' + fileName, {
      responseType: 'blob',
    });
  }
}
