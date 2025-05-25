import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-code',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: 'confirm-code.component.html',
  styleUrls: ['confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  code = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      if (!this.email) {
        this.router.navigate(['/register']);
      }
    });
  }

  onConfirmCode() {
    if (!this.code.trim()) {
      this.errorMessage = 'Пожалуйста введите код подтверждения';
      return;
    }

    if (this.code.length !== 6) {
      this.errorMessage = 'Код должен содержать 6 символов';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const confirmData = {
      email: this.email,
      code: this.code.toString()
    };

    this.authService.confirmCode(confirmData)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Email успешно подтвержден! Перенаправляем на страницу входа...';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Неверный или просроченный код. Попробуйте еще раз.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  resendCode() {
    if (!this.email) {
      this.errorMessage = 'Email не найден';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const userData = {
      email: this.email,
      password: ''
    };

    this.authService.resendCode(this.email)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Код подтверждения отправлен повторно на ваш email';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Ошибка при повторной отправке кода';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  goBackToRegister() {
    this.router.navigate(['/register']);
  }

  onCodeInput(event: any) {
    const value = event.target.value;
    const cleanValue = value.substring(0, 6);
    this.code = cleanValue.toUpperCase();

    event.target.value = this.code;

    if (this.code.length === 6) {
      this.errorMessage = '';
    }
  }
}
