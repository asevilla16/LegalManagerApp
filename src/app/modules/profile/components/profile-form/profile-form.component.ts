import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { UserRole } from '../../models/user-profile';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-form',
  standalone: false,
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css',
})
export class ProfileFormComponent implements OnInit {
  roles = UserRole;
  profileForm: FormGroup = new FormGroup({});

  currentUserId: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.buildForm();
    this.getCurrentUserId();
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      id: [0],
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      role: [''],
      password: [''],
      confirmPassword: [''],
      username: [''],
      middleName: [''],
      barNumber: [''],
      barRegistrationDate: [new Date()],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  getCurrentUserId() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUserId = user.id || '';
      }
    });
  }

  loadUserProfile() {
    this.authService
      .getUserById(this.currentUserId)
      .subscribe((currentUser) => {
        if (currentUser) {
          this.profileForm.patchValue({
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
        }
      });
  }

  validatePasswordMatch(): boolean {
    const password = this.profileForm.get('password')?.value;
    const confirmPassword = this.profileForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  handleUpdateProfile() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm);
      const { id, confirmPassword, ...updatedProfile } = this.profileForm.value;

      if (!this.validatePasswordMatch()) {
        console.log('Passwords do not match');
        return;
      }

      if (updatedProfile.password === '') {
        delete updatedProfile.password; // Remove password field if it's empty
      }

      // Aquí puedes llamar a un servicio para actualizar el perfil en el backend
      this.authService
        .updateProfile(this.currentUserId, updatedProfile)
        .subscribe({
          next: (response) => {
            console.log('Profile updated successfully', response);
            this.toastr.success('Profile updated successfully');
          },
          error: (error) => {
            console.error('Error updating profile', error);
          },
        });
    } else {
      console.log('Formulario no válido');
    }
  }
}
