import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';

export interface RegisterLoginData {
  email: string;
  password: string;
}

export interface ConfirmCodeData {
  email: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/auth`;

  login(userData: RegisterLoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, userData, {
      responseType: 'text'
    });
  }

  register(userData: RegisterLoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, userData, {
      responseType: 'text'
    });
  }

  confirmCode(data: ConfirmCodeData): Observable<string> {
    return this.http.post(`${this.baseUrl}/register/confirm-code`, data, {
      responseType: 'text'
    });
  }

  resendCode(email: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/reset-request`, { email }, {
      responseType: 'text'
    });
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
