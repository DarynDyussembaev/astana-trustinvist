import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {CatalogComponent} from './pages/catalog/catalog.component';

export const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  {
    path: "Home",
    component: MainComponent,
  },
  {
    path: "Catalog",
    component: CatalogComponent,
  }
];
