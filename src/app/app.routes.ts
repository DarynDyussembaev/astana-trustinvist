import {Routes} from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {CatalogComponent} from './pages/catalog/pages/catalog/catalog.component';
import {CompaniesComponent} from './pages/companies/pages/companies/companies.component';
import {ContactsComponent} from './pages/contacts/contacts.component';
import {NewsComponent} from './pages/news/news.component';

export const routes: Routes = [
  {path: "", redirectTo: "Home", pathMatch: "full"},
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
    path: "news",
    component: NewsComponent,
  }
];
