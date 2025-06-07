import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  private authService = inject(AuthService);
  private router = inject(Router)

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
