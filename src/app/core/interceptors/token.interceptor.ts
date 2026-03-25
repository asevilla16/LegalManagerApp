import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.isLoggedIn() ? authService.getToken() : null;

  const skipUrls = ['/auth/login', '/auth/register', '/auth/refresh'];
  const shouldSkip = skipUrls.some((url) => req.url.includes(url));

  if (token && !shouldSkip) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          authService.logout();
          router.navigate(['/auth']);
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
