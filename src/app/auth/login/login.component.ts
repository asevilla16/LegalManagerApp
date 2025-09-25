import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.buildForm();
  }

  buildForm() {
    return this.formBuilder.group({
      email: [
        localStorage.getItem('email') || '',
        [Validators.required, Validators.email],
      ],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        if (rememberMe) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
        localStorage.setItem('token', response.token);
        this.authService.setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      },
    });

    console.log(this.loginForm.value);
    this.router.navigate(['/dashboard']);
  }
}
