import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: User = { email: '' };

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || '',
        token: user?.token || '',
      };
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
