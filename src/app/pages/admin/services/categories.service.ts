import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

export interface GetCategoriesResponse {
  id: number;
  name: string;
  parentCategory?: string;
  categories: string[]
}

export interface CreateEditCategory {
  name: string;
  parentId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/category`;

  public getAllCategories(): Observable<GetCategoriesResponse[]> {
    return this.http.get<GetCategoriesResponse[]>(`${this.baseUrl}/getAll`);
  }

  public getCategoryById(id: number): Observable<GetCategoriesResponse> {
    return this.http.get<GetCategoriesResponse>(`${this.baseUrl}/${id}`);
  }

  public createCategory(categoryData: CreateEditCategory): Observable<GetCategoriesResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(categoryData));
    return this.http.post<GetCategoriesResponse>(`${this.baseUrl}`, formData);
  }

  public editCategory(id: number, categoryData: CreateEditCategory): Observable<GetCategoriesResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(categoryData));
    return this.http.put<GetCategoriesResponse>(`${this.baseUrl}/${id}`, formData);
  }

  public deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
