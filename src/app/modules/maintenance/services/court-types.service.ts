import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtType } from '../models/court-type';

@Injectable({
  providedIn: 'root',
})
export class CourtTypesService {
  baseUrl = environment.apiUrl + '/court-type';
  private http = inject(HttpClient);

  getCourtTypes(): Observable<CourtType[]> {
    return this.http.get<CourtType[]>(this.baseUrl);
  }

  createCourtType(courtTypeData: any) {
    return this.http.post(this.baseUrl, courtTypeData);
  }
}
