import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MonthCases } from '../models/month-cases';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl = environment.apiUrl + '/statistics/';
  private http = inject(HttpClient);

  getAllCases() {
    return this.http.get<number>(this.baseUrl + 'cases');
  }

  getCasesByStatus() {
    return this.http.get<{ status: string; _count: any }[]>(
      this.baseUrl + 'cases/cases-by-status'
    );
  }

  getActiveAndInactiveCases() {
    return this.http.get<{ status: string; _count: any }[]>(
      this.baseUrl + 'cases/get-active-and-inactive-cases'
    );
  }

  getCasesByType() {
    return this.http.get<{ type: string; _count: any }[]>(
      this.baseUrl + 'cases/cases-by-type'
    );
  }

  getTotalClients(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'clients/total-clients');
  }

  getCasesOfTheMonth(): Observable<MonthCases> {
    return this.http.get<MonthCases>(this.baseUrl + 'cases/cases-of-the-month');
  }
}
