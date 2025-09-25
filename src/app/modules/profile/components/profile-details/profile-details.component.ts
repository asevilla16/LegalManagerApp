import { Component, Input, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  standalone: false,
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css',
})
export class ProfileDetailsComponent {
  @Input() userInfo: Signal<any> = signal(null);

  get fullName() {
    return `${this.userInfo()?.firstName} ${
      this.userInfo()?.middleName ? this.userInfo()?.middleName : ''
    } ${this.userInfo()?.lastName}`;
  }
}
