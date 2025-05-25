import { Component } from '@angular/core';
import {NewsCardComponent} from '../../shared/components/news-card/news-card.component';
import {NgForOf} from '@angular/common';
export interface NewsCard {
  image: string;
  date: string;
  title: string;
}
@Component({
  selector: 'app-news',
  imports: [
    NewsCardComponent,
    NgForOf
  ],
  templateUrl: './news.component.html',
  standalone: true,
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  dates: NewsCard[]   = [
    {
      image: 'assets/img/Rectangle.jpg',
      date: '26 Апреля 2022',
      title: 'Конференция «Молочное Животноводство Алтая: Вызовы, Проблемы Решения»',
    },
    {
      image: 'assets/img/Rectangle.jpg',
      date: '15 Мая 2022',
      title: 'Выставка сельскохозяйственного оборудования',
    },
    {
      image: 'assets/img/Rectangle.jpg',
      date: '10 Июня 2022',
      title: 'Форум аграриев 2022',
    },
    {
      image: 'assets/img/Rectangle.jpg',
      date: '26 Апреля 2022',
      title: 'Конференция «Молочное Животноводство Алтая: Вызовы, Проблемы Решения»',
    },
    {
      image: 'assets/img/Rectangle.jpg',
      date: '15 Мая 2022',
      title: 'Выставка сельскохозяйственного оборудования',
    },
    {
      image: 'assets/img/Rectangle.jpg',
      date: '10 Июня 2022',
      title: 'Форум аграриев 2022',
    }
  ]
}
