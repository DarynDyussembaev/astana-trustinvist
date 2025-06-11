import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

export interface ProductResponse {
  id: number;
  name: string;
  manufacturer: string;
  description: string;
  categoryId: number;
  deliveryType: 'DELIVERY' | 'PICKUP';
  imageUrl?: string;
}

export interface ProductRequest {
  name: string;
  manufacturer: string;
  description: string;
  categoryId: number;
  deliveryType: 'DELIVERY' | 'PICKUP';
  imageUrl?: string;
}

export interface ProductPage {
  content: ProductResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/product`;

  public getAllProducts(page: number = 0, size: number = 10): Observable<ProductPage> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<ProductPage>(`${this.baseUrl}/getAllProducts`, { params });
  }

  public getFilteredProducts(keyword?: string, categoryId?: number, page: number = 0, size: number = 10): Observable<ProductPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (keyword) params = params.set('keyword', keyword);
    if (categoryId) params = params.set('categoryId', categoryId.toString());

    return this.http.get<ProductPage>(`${this.baseUrl}/getFilteredProducts`, { params });
  }

  public getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  public createProduct(productData: ProductRequest, imageFile?: File): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(productData));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.post<ProductResponse>(`${this.baseUrl}`, formData);
  }

  public updateProduct(id: number, productData: ProductRequest, imageFile?: File): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(productData));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, formData);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  public getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getProductCount`);
  }
}
