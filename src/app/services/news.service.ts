import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {NewsCard} from '../pages/news/news.component';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.baseUrl}/news`;


  constructor() { }

  getAllNews(): Observable<NewsCard[]> {
    return this.http.get<NewsCard[]>(this.baseUrl);
  }
}
