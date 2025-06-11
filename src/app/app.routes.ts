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
import { NewsComponent } from './pages/news/news.component';
import { PlacingAnOrderComponent } from './pages/placing-an-order/placing-an-order.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { BasketComponent } from './pages/basket/basket.component';

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
        component: NewsComponent,
      },
      {
        path: 'placing-an-order',
        component: PlacingAnOrderComponent
      },
      {
        path: 'callback',
        component: CallbackComponent,
      },
      {
        path: 'basket',
        component: BasketComponent,
      }
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
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadComponent: () => import('./pages/admin/components/categories/category-table/category-table.component').then(c => c.CategoryTableComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/admin/components/products/product-table/product-table.component').then(c => c.ProductTableComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./pages/admin/components/employees/employee-table/employee-table.component').then(c => c.EmployeeTableComponent)
      },
      {
        path: 'news',
        loadComponent: () => import('./pages/admin/components/news/news-table/news-table.component').then(c => c.NewsTableComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'Home' },
];
