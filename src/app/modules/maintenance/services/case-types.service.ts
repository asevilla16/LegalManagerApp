import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CaseType } from '../models/case-type';

@Injectable({
  providedIn: 'root',
})
export class CaseTypesService {
  baseURL = environment.apiUrl + '/case-types';
  private http = inject(HttpClient);

  getCaseTypes(): Observable<CaseType[]> {
    return this.http.get<CaseType[]>(this.baseURL);
  }

  createCaseType(caseType: CaseType): Observable<CaseType> {
    return this.http.post<CaseType>(this.baseURL, caseType);
  }
}
