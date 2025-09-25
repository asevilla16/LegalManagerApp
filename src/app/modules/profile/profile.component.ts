import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  currentUserId = '';
  userInfo = signal<any>(null);

  constructor(private authService: AuthService) {
    this.getCurrentUserId();
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  getCurrentUserId() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUserId = user.id || '';
      }
    });
  }

  loadUserInfo() {
    this.authService
      .getUserById(this.currentUserId)
      .subscribe((currentUser) => {
        if (currentUser) {
          this.userInfo.set({
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            phone: currentUser.phone,
            role: currentUser.role,
            username: currentUser.username,
            middleName: currentUser.middleName,
            barNumber: currentUser.barNumber,
            barRegistrationDate: currentUser.barRegistrationDate,
            isAttorney: currentUser.isAttorney,
          });
          console.log({ userInfo: this.userInfo() });
        }
      });
  }

  get fullName() {
    return `${this.userInfo()?.firstName} ${
      this.userInfo()?.middleName ? this.userInfo()?.middleName : ''
    } ${this.userInfo()?.lastName}`;
  }
}
