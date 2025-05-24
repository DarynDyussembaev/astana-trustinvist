import {Component, OnInit, HostListener, inject} from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoriesComponent } from '../../components/categories/categories.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [
    CardComponent,
    NgxPaginationModule,
    CategoriesComponent
  ],
  templateUrl: './catalog.component.html',
  standalone: true,
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  private _router = inject(Router);
  maxSize = 7;
  public directionLinks: boolean = false;
  public autoHide: boolean = false;

  config = {
    id: 'catalog',
    itemsPerPage: 9,
    currentPage: 1
  };

  cards = [
    {
      id:1,
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Делитель проб желобчатый ДП 5',
      subtitle: 'Оборудование для дробления и измельчения'
    },
    {
      id:2,
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'ЛинтеЛ® АТХ–20',
      subtitle: 'Оборудование для испытания нефтепродуктов'
    },
    {
      id:3,
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'ИНФРАСКАН-3150',
      subtitle: 'Оборудование для экспресс-анализа'
    },
    {
      id:4,
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Анализатор жидкости "Эксперт-001"',
      subtitle: 'РН-метры'
    },
    {
      id:5,
      promotion: 'Новинка',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Прибор измерения влажности ВЛ-1',
      subtitle: 'Измерительные приборы'
    },
    {
      id:6,
      promotion: 'Хит продаж',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Термостат циркуляционный ТЦ-80',
      subtitle: 'Термостатическое оборудование'
    },
    {
      id:7,
      promotion: '',
      status: 'Под заказ',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Микроскоп лабораторный МЛ-2',
      subtitle: 'Оптическое оборудование'
    },
    {
      id:8,
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Центрифуга настольная ЦН-3',
      subtitle: 'Лабораторное оборудование'
    },
  ];

  ngOnInit(): void {
    this.updatePaginationSettings();
  }

  onPageChange(number: number): void {
    this.config.currentPage = number;
    this.scrollToTop();
  }

  onPageBoundsCorrection(number: number): void {
    this.config.currentPage = number;
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updatePaginationSettings();
  }

  private updatePaginationSettings(): void {
    const width = window.innerWidth;

    if (width < 640) {
      this.maxSize = 3;
      this.config.itemsPerPage = 6;
    } else if (width < 768) {
      this.maxSize = 5;
      this.config.itemsPerPage = 8;
    } else if (width < 1024) {
      this.maxSize = 5;
      this.config.itemsPerPage = 8;
    } else {
      this.maxSize = 7;
      this.config.itemsPerPage = 9;
    }
  }

  public navigateToDetail(id: number): void {
    this._router.navigate([`/catalog/${id}`]);
  }
}
