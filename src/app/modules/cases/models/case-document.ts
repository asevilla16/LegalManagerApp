export interface CaseDocument {
  id?: string;
  caseId?: string;
  clientId?: string;
  title?: string;
  filePath: string;
  originalName: string;
  fileName: string;
  size: string;
  mimeType: string;
  documentTypeId: string;
  isPrivileged?: boolean;
  isEvidence?: boolean;
  confidentialityLevel?: string;
  versionNumber?: string;
  parentDocumentId?: string;
  createdBy?: string;
}

export interface CreateFileDto {
  file: File;
  caseId: string;
  clientId: string;
  documentTypeId: string;
  versionNumber: string;
  createdBy: string;
}
