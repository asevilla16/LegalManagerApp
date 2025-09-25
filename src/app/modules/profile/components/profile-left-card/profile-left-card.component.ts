import { Component, Input, signal, Signal } from '@angular/core';

@Component({
  selector: 'app-profile-left-card',
  standalone: false,
  templateUrl: './profile-left-card.component.html',
  styleUrl: './profile-left-card.component.css',
})
export class ProfileLeftCardComponent {
  @Input() userInfo: Signal<any> = signal(null);

  get fullName() {
    return `${this.userInfo()?.firstName} ${
      this.userInfo()?.middleName ? this.userInfo()?.middleName : ''
    } ${this.userInfo()?.lastName}`;
  }
}
