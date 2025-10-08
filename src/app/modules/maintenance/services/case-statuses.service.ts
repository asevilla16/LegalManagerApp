import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseStatus } from '../models/case-status';

@Injectable({
  providedIn: 'root',
})
export class CaseStatusesService {
  baseUrl = environment.apiUrl + '/case-status';
  private http = inject(HttpClient);

  getCaseStatuses(): Observable<CaseStatus[]> {
    return this.http.get<CaseStatus[]>(this.baseUrl);
  }

  createCaseStatus(caseStatusData: CaseStatus): Observable<CaseStatus> {
    return this.http.post<CaseStatus>(this.baseUrl, caseStatusData);
  }

  getCaseStatus(): Observable<CaseStatus> {
    return this.http.get<CaseStatus>(this.baseUrl);
  }

  deleteCaseStatus(id: number): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/deactivate/${id}`);
  }
}
