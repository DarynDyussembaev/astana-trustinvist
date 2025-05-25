import {NewsComponent} from './pages/news/news.component';
import {PlacingAnOrderComponent} from './pages/placing-an-order/placing-an-order.component';
import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CatalogComponent } from './pages/catalog/pages/catalog/catalog.component';
import { CompaniesComponent } from './pages/companies/pages/companies/companies.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { adminGuard } from './core/auth/guards/admin.guard';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { ConfirmCodeComponent } from './core/auth/components/confirm-code/confirm-code.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: "Home",
        component: MainComponent,
      },
      {
        path: "companies",
        component: CompaniesComponent,
      },
      {
        path: "catalog",
        component: CatalogComponent,
      },
      {
        path: 'catalog/:id',
        loadComponent: () => import('./pages/catalog/pages/catalog-detail/catalog-detail.component').then(c => c.CatalogDetailComponent)
      },
      {
        path: "contacts",
        component: ContactsComponent,
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'placing-an-order',
        component: PlacingAnOrderComponent,
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'confirm-code',
    component: ConfirmCodeComponent
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/pages/admin-panel/admin-panel.component').then(c => c.AdminPanelComponent),
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: 'Home' },
];
