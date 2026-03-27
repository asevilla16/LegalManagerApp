import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseURL = environment.apiUrl + '/category';
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseURL);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseURL, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseURL}/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.baseURL}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
