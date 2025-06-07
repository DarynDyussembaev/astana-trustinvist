import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

export interface NewsResponse {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface NewsRequest {
  title: string;
  content: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/news`;

  public getAllNews(): Observable<NewsResponse[]> {
    return this.http.get<NewsResponse[]>(`${this.baseUrl}`);
  }

  public getNewsById(id: number): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.baseUrl}/${id}`);
  }

  public createNews(newsData: NewsRequest, imageFile: File): Observable<NewsResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(newsData));
    formData.append('image', imageFile);
    return this.http.post<NewsResponse>(`${this.baseUrl}`, formData);
  }

  public updateNews(id: number, newsData: NewsRequest, imageFile?: File): Observable<NewsResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(newsData));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.put<NewsResponse>(`${this.baseUrl}/${id}`, formData);
  }

  public deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
