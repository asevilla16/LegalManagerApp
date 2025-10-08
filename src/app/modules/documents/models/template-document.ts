export interface TemplateDocument {
  id?: string;
  title?: string;
  filePath: string;
  fileName: string;
  originalName: string;
  size: string;
  documentTypeId: string;
  versionNumber?: string;
  parentDocumentId?: string;
  createdBy?: string;
}

export interface CreateTemplateFileDto {
  file: File;
  documentTypeId: string;
  versionNumber: string;
  createdBy: string;
}
