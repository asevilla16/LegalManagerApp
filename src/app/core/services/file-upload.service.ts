import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs';
import {
  CaseDocument,
  CreateFileDto,
} from '../../modules/cases/models/case-document';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  baseUrl = environment.apiUrl + '/files';

  private maxFileSizeMB = 15; // Maximum file size in MB

  private http = inject(HttpClient);

  uploadFile(caseFile: CreateFileDto) {
    if (caseFile.file.size > this.maxFileSizeMB * 1024 * 1024) {
      throw new Error(
        `File size exceeds the maximum limit of ${this.maxFileSizeMB} MB.`
      );
    }

    const formData: FormData = new FormData();
    formData.append('file', caseFile.file);
    formData.append('caseId', caseFile.caseId);
    formData.append('clientId', caseFile.clientId);
    formData.append('documentTypeId', caseFile.documentTypeId);
    formData.append('versionNumber', caseFile.versionNumber);
    formData.append('createdBy', caseFile.createdBy);

    console.log({ fileInService: caseFile.file });

    return this.http
      .post<{ secureUrl: string }>(this.baseUrl + '/case-file', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          return this.getUploadPercentage(event);
        })
      );
  }

  downloadFile(fileName: string) {
    return this.http.get(this.baseUrl + '/case-file/' + fileName, {
      responseType: 'blob',
    });
  }

  getDocumentsByCase(caseId: string) {
    return this.http.get(
      this.baseUrl + '/case-file/documents-by-case/' + caseId
    );
  }

  private getUploadPercentage(event: HttpEvent<{ secureUrl: string }>) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          const progress = Math.round(
            (100 * event.loaded) / (event.total || 1)
          );
          return { status: 'progress', message: progress };
        }
        return { status: 'progress', message: 0 };
      case HttpEventType.Response:
        return {
          status: 'complete',
          message: event.body?.secureUrl || '',
        };
      default:
        return { status: 'loading...' };
    }
  }
}
