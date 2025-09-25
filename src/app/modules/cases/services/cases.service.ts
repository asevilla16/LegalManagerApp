import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../models/case';
import { PaginatedResponse } from '../../../core/models/PaginatedResponse';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  baseUrl = environment.apiUrl + '/cases';
  private http = inject(HttpClient);

  getCases() {
    return this.http.get(this.baseUrl);
  }

  createCase(caseData: any) {
    return this.http.post(this.baseUrl, caseData);
  }

  getCase(caseId: string): Observable<Case> {
    return this.http.get<Case>(`${this.baseUrl}/${caseId}`);
  }

  getPaginatedCases(
    pageSize: number,
    page: number
  ): Observable<PaginatedResponse<Case[]>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<PaginatedResponse<Case[]>>(
      this.baseUrl + '/paginated-cases',
      { params }
    );
  }

  updateCase(caseId: string, caseObject: Case) {
    return this.http.patch(this.baseUrl + '/' + caseId, caseObject);
  }
}
