import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let user: User = {} as User;

  authService.currentUser$.subscribe({
    next: (currentUser) => {
      if (currentUser) {
        user = currentUser;
      }
    },
    error: (error) => {
      console.error('Error fetching current user:', error);
    },
  });

  if (!user || !user.role || user.role !== 'ADMIN') {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
