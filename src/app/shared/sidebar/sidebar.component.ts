import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
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
