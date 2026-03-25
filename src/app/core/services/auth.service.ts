import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserProfile } from '../../modules/profile/models/user-profile';
import { PaginatedResponse } from '../models/PaginatedResponse';

interface TokenPayload {
  exp: number;
  sub: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = environment.apiUrl + '/auth';

  private http = inject(HttpClient);

  private readonly userSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseURL + '/login', { email, password });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const currentUser = this.userSubject.value;
    return currentUser?.role === 'ADMIN';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.verifyTokenWithBackend(token);
  }

  verifyTokenWithBackend(token: string): Observable<any> {
    return this.http.post(`${this.baseURL}/verify-token`, { token });
  }

  checkTokenValidity(): void {
    const token = this.getToken() ?? '';

    this.verifyTokenWithBackend(token).subscribe({
      next: (res: any) => {
        if (res.valid) {
          return true;
        }
        return false;
      },
      error: (err) => {
        console.log('Token invalid or expired', err);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + '/get-users');
  }

  getPaginatedUsers(
    pageSize: number,
    page: number
  ): Observable<PaginatedResponse<User[]>> {
    const params = new HttpParams().set('page', page).set('pageSize', pageSize);

    return this.http.get<PaginatedResponse<User[]>>(
      this.baseURL + '/get-paginated-users',
      { params }
    );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/get-user/${userId}`);
  }

  registerNewUser(userData: Partial<User>): Observable<User> {
    return this.http.post<User>(this.baseURL + '/create-user', userData);
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.post<User>(
      `${this.baseURL}/update-user/${userId}`,
      userData
    );
  }

  updateProfile(
    userId: string,
    userData: Partial<UserProfile>
  ): Observable<UserProfile> {
    return this.http.post<UserProfile>(
      `${this.baseURL}/update-profile/${userId}`,
      userData
    );
  }
}
