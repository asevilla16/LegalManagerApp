import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { User } from '../models/user';

export const userInfoInterceptor: HttpInterceptorFn = (req, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const authService = inject(AuthService);
    const body = req.body || {};
    let currentUser: any = {} as User;
    authService.currentUser$.pipe(take(1)).subscribe((user) => {
      currentUser = user;
    });

    if (currentUser) {
      const modifiedBody = {
        ...body,
        createdBy: currentUser.username || 'unknown',
      };

      const modifiedReq = req.clone({
        body: modifiedBody,
      });

      return next(modifiedReq);
    }
  }

  return next(req);
};
