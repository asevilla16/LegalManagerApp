import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from '../../../../../core/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-form',
  standalone: false,
  templateUrl: './users-form.component.html',
  styleUrl: './users-form.component.css',
})
export class UsersFormComponent {
  userForm: FormGroup = new FormGroup({});

  userId = '';

  roles = UserRole;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadUserData(this.userId);
    }
  }

  loadUserData(userId: string) {
    this.authService.getUserById(userId).subscribe({
      next: (user) => {
        console.log('User data loaded:', user);
        this.setFormData(user);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.toastr.error('Error loading user data');
      },
    });
  }

  setFormData(userData: any) {
    this.userForm.patchValue({
      ...userData,
      barRegistrationDate: userData.barRegistrationDate
        ? userData.barRegistrationDate.toString().split('T')[0]
        : null,
      phoneNumber: userData.phone,
    });
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      id: [0],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      username: [''],
      email: [''],
      role: [''],
      phoneNumber: [''],
      barNumber: [''],
      barRegistrationDate: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  validatePasswordsMatch() {
    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  handleSubmit() {
    if (this.userId) {
      console.log(this.userForm.value);
      this.modifyUser();
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    if (this.userForm.valid && this.validatePasswordsMatch()) {
      const { id, confirmPassword, ...userData } = this.userForm.value;

      this.authService.registerNewUser(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          // Handle successful registration (e.g., navigate to login)
          this.router.navigate(['/maintenance/users']);
          this.toastr.success('User registered successfully');
        },
        error: (error) => {
          console.error('Error registering user:', error);
          this.toastr.error('Error registering user');
        },
      });
    } else {
      this.toastr.error('Form is invalid or passwords do not match');
    }
  }

  modifyUser() {
    if (this.userForm.valid && this.validatePasswordsMatch()) {
      const { id, confirmPassword, ...userData } = this.userForm.value;

      if (userData.password === '') {
        delete userData.password;
      }

      this.authService.updateUser(id, userData).subscribe({
        next: (response) => {
          console.log('User modified successfully:', response);
        },
        error: (error) => {
          console.error('Error modifying user:', error);
          this.toastr.error('Error modifying user');
        },
      });
    }
  }

  setCursorToStart(event: Event) {
    const input = event.target as HTMLInputElement;
    setTimeout(() => {
      input.setSelectionRange(0, 0);
    }, 0);
  }
}
