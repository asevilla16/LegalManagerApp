import { Component, OnInit } from '@angular/core';
import { DocumentsService } from './services/documents.service';
import {
  CreateTemplateFileDto,
  TemplateDocument,
} from './models/template-document';
import { FileUploadService } from '../../core/services/file-upload.service';
import { fileIconSelector } from '../../core/utils/file-icon-selector';
import { CreateFileDto } from '../cases/models/case-document';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent implements OnInit {
  templateDocuments: TemplateDocument[] = [];

  selectedDocument?: File;

  constructor(
    private documentsService: DocumentsService,
    private fileUploadService: FileUploadService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getTemplateDocuments();
  }

  getTemplateDocuments() {
    this.documentsService.getTemplateDocuments().subscribe({
      next: (documents) => {
        console.log(documents);
        this.templateDocuments = documents;
      },
      error: (error) => {
        console.error('Error fetching template documents:', error);
      },
    });
  }

  uploadFile() {
    if (this.selectedDocument) {
      const createFileDto: CreateTemplateFileDto = {
        file: this.selectedDocument,
        documentTypeId: '2',
        versionNumber: '1',
        createdBy: 'asevilla16',
      };

      this.authService.currentUser$.subscribe(
        (user) => (createFileDto.createdBy = user?.username || 'unknown')
      );

      this.fileUploadService.uploadTemplateFile(createFileDto).subscribe({
        next: (res) => {
          this.selectedDocument = undefined;
          this.getTemplateDocuments();
        },
        error: (err) => {
          console.log({ err });
        },
      });
    }
  }

  getIconForDocument(doc: any): string {
    return fileIconSelector(doc.fileName);
  }

  onFileSelected(e: any) {
    const fileList: FileList = e.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedDocument = fileList[0];
    }
  }

  downloadFile(fileName: string, originalName: string) {
    this.documentsService.downloadFile(fileName).subscribe({
      next: (blob: Blob) => {
        console.log(blob);
        const fileExtension = originalName.substring(
          originalName.lastIndexOf('.')
        );
        const fileNameWithoutExt = originalName.substring(
          0,
          originalName.lastIndexOf('.')
        );
        this.handleBlobDownload(
          blob,
          `${fileNameWithoutExt}_template${fileExtension}`
        );
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

  handleBlobDownload(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    console.log({ a, url });
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
