import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Products} from './model/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.baseUrl}/product`;

  constructor() { }

  getProductAll(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.baseUrl}/getAllProducts`);
  }
}
