import { Client } from '../../clients/models/client';

export interface CaseParty {
  id: number;
  caseId: number;
  clientId?: number;
  partyType: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  isClient: boolean;
  isActive: boolean;
  createdAt: Date;
  client: Client;
}
