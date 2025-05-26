import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  errorMessage = '';

  onRegister() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const registerData = {
      email: this.credentials.email,
      password: this.credentials.password
    };

    this.authService.register(registerData)
      .subscribe({
        next: (response) => {

          this.router.navigate(['/confirm-code'], {
            queryParams: { email: this.credentials.email }
          });
        },
        error: (error) => {
          this.errorMessage = 'Ошибка регистрации. Возможно, пользователь уже существует.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private validateForm(): boolean {
    if (!this.credentials.email || !this.credentials.password ||
      !this.credentials.confirmPassword) {
      this.errorMessage = 'Пожалуйста заполните все поля';
      return false;
    }

    if (!this.isValidEmail(this.credentials.email)) {
      this.errorMessage = 'Пожалуйста введите корректный email';
      return false;
    }

    if (this.credentials.password.length < 6) {
      this.errorMessage = 'Пароль должен содержать минимум 6 символов';
      return false;
    }

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goBackToSite() {
    this.router.navigate(['']);
  }
}
