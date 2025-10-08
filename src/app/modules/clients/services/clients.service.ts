import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { PaginatedResponse } from '../../../core/models/PaginatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  baseURL = environment.apiUrl + '/clients';
  private http = inject(HttpClient);

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseURL + '/all-clients');
  }

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseURL}/${clientId}`);
  }

  getPaginatedClients(
    pageSize: number,
    page: number
  ): Observable<PaginatedResponse<Client[]>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<PaginatedResponse<Client[]>>(
      this.baseURL + '/paginated-clients',
      { params }
    );
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseURL, client);
  }

  updateClient(clientId: number, client: Client) {
    return this.http.patch(this.baseURL + `/${clientId}`, client);
  }
}
