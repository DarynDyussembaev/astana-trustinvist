import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {CatalogComponent} from './pages/catalog/pages/catalog/catalog.component';
import {CompaniesComponent} from './pages/companies/pages/companies/companies.component';
import {ContactsComponent} from './pages/contacts/contacts.component';

export const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  {
    path: "Home",
    component: MainComponent,
  },
  {
    path: "Companies",
    component: CompaniesComponent,
  },
  {
    path: "Catalog",
    component: CatalogComponent,
  },
  {
    path: "contacts",
    component: ContactsComponent,
  }
];
