import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterLoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080';

  login(userData: RegisterLoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/login`, userData, {
      responseType: 'text'
    });
  }

  register(userData: RegisterLoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData, {
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
