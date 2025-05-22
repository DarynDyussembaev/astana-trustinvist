import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NewsCardComponent} from '../../shared/components/news-card/news-card.component';
import {NgForOf, NgIf} from '@angular/common';
interface Event {
  image: string;
  date: string;
  title: string;
}
@Component({
  selector: 'app-important-updates-events',
  imports: [
    NewsCardComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './important-updates-events.component.html',
  standalone: true,
  styleUrl: './important-updates-events.component.scss'
})
export class ImportantUpdatesEventsComponent implements OnInit, AfterViewInit {
  events: Event[] = [];

  currentSlide = 0;
  totalSlides = 0;
  isMobile = false;

  @ViewChild('slider') slider?: ElementRef;

  ngOnInit() {
    this.checkScreenSize();

    // Слушатель изменения размера окна
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });

    this.events = [
      {
        image: 'assets/img/news1.jpg',
        date: '26 Апреля 2022',
        title: 'Конференция «Молочное Животноводство Алтая: Вызовы, Проблемы Решения»',
      },
      {
        image: 'assets/img/news2.jpg',
        date: '15 Мая 2022',
        title: 'Выставка сельскохозяйственного оборудования',
      },
      {
        image: 'assets/img/news3.jpg',
        date: '10 Июня 2022',
        title: 'Форум аграриев 2022',
      }
    ];
    this.totalSlides = this.events.length;
  }

  ngAfterViewInit() {
    if (this.isMobile) {
      this.initMobileSlider();
    }
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 860;

    if (this.isMobile && this.slider) {
      this.initMobileSlider();
    }
  }

  initMobileSlider() {
    if (this.slider) {
      const sliderElement = this.slider.nativeElement;
      let startX: number;
      let moved = false;

      sliderElement.addEventListener('touchstart', (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        moved = false;
      });

      sliderElement.addEventListener('touchmove', () => {
        moved = true;
      });

      sliderElement.addEventListener('touchend', (e: TouchEvent) => {
        if (moved) {
          const endX = e.changedTouches[0].clientX;
          const diff = startX - endX;

          if (diff > 50 && this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
          } else if (diff < -50 && this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
          }
        }
      });
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlide = index;

      if (this.slider) {
        const offset = -100 * this.currentSlide;
        this.slider.nativeElement.style.transform = `translateX(${offset}%)`;
      }
    }
  }
}
