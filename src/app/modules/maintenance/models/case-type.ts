import { Category } from './category';

export interface CaseType {
  id: number;
  name: string;
  code: string;
  categoryId: number; //'CIVIL' | 'CRIMINAL' | 'FAMILY' | 'LABOR' | 'COMMERCIAL' | 'ADMINISTRATIVE' | 'TAX' | 'MIXED';
  category?: Category;
  statuteOfLimitationDays?: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
