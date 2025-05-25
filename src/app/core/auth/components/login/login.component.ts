import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = {
    email: '',
    password: ''
  };

  isLoading = false;
  errorMessage = '';

  onLogin() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Пожалуйста заполните все поля';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData = {
      email: this.credentials.email,
      password: this.credentials.password,
    }

    this.authService.login(loginData)
      .subscribe({
        next: (token) => {
          this.authService.setToken(token);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.errorMessage = 'Неправильные данные. Пожалуйста, попробуйте еще раз.';
          this.isLoading = false;
          console.error('Login error:', error);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  goBackToSite() {
    this.router.navigate(['']);
  }
}
