import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {CategoriesComponent} from '../../components/categories/categories.component';

@Component({
  selector: 'app-admin-panel',
  imports: [
    RouterLink,
    CategoriesComponent
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
