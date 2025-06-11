import {Component, inject, OnInit} from '@angular/core';
import {NewsCardComponent} from '../../shared/components/news-card/news-card.component';
import {DatePipe, NgForOf} from '@angular/common';
import {NewsService} from '../../services/news.service';
export interface NewsCard {
  imageUrl: string;
  createdAt: string;
  title: string;
}
@Component({
  selector: 'app-news',
  imports: [
    NewsCardComponent,
    NgForOf,
    DatePipe
  ],
  templateUrl: './news.component.html',
  standalone: true,
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  private newsService: NewsService = inject(NewsService);
  news: NewsCard[] = []

  ngOnInit() {
    this.getNewsAll()
  }

  getNewsAll() {
    this.newsService.getAllNews().subscribe({
      next: response => {
        this.news = response
      }
    })
  }
  // dates: NewsCard[]   = [
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '26 Апреля 2022',
  //     title: 'Конференция «Молочное Животноводство Алтая: Вызовы, Проблемы Решения»',
  //   },
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '15 Мая 2022',
  //     title: 'Выставка сельскохозяйственного оборудования',
  //   },
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '10 Июня 2022',
  //     title: 'Форум аграриев 2022',
  //   },
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '26 Апреля 2022',
  //     title: 'Конференция «Молочное Животноводство Алтая: Вызовы, Проблемы Решения»',
  //   },
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '15 Мая 2022',
  //     title: 'Выставка сельскохозяйственного оборудования',
  //   },
  //   {
  //     image: 'assets/img/Rectangle.jpg',
  //     date: '10 Июня 2022',
  //     title: 'Форум аграриев 2022',
  //   }
  // ]
}
