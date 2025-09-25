import { CaseDocument } from './case-document';
import { CaseParty } from './case-party';

export interface Case {
  id: number;
  lawFirmId: number;
  caseNumber: string;
  courtCaseNumber?: string;
  title: string;
  caseTypeId: number;
  description?: string;
  caseStatusId: number;
  courtTypeId?: number;
  filingDate: Date;
  primaryAttorneyId?: string;
  originatingAttorneyId?: string;
  parties: CaseParty[];
  createdById: string;
  createdAt: Date;
  documents: CaseDocument[];
}
