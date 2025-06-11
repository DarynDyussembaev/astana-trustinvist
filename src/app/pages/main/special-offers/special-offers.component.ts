import {Component, inject, OnInit} from '@angular/core';
import {CardComponent} from '../../../shared/components/card/card.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Products} from '../../../services/model/product.models';
import {ProductService} from '../../../services/product.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-special-offers',
  imports: [
    CardComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './special-offers.component.html',
  standalone: true,
  styleUrl: './special-offers.component.scss'
})
export class SpecialOffersComponent implements OnInit{

  cards: Products[] = [];
  cardsAny: BehaviorSubject<Products[]> = new BehaviorSubject<Products[]>([]);
  private productService: ProductService = inject(ProductService);


  ngOnInit() {
    this.getProductsAll()
    this.getProductsAllAny()
  }

  getProductsAllAny(): void {
    this.productService.getProductAll().subscribe({
      next: (result) => {
        this.cards = result.slice(0, 4);
      }
    });
  }

  getProductsAll(): void {
    this.productService.getProductAll().subscribe({
      next: (result) => {
        this.cards = result
          .filter(product => product.deliveryType === 'ORDER')
          .slice(0, 4);
      }
    });
  }


//   cards = [
//     {
//       promotion:'Акция',
//       status:'В наличии',
//       imageUrl: 'assets/img/dp-5.png',
//       title: 'Делитель проб  желобчатый ДП 5',
//       subtitle: 'Оборудование для дробления и измельчения'
//     },
//     {
//       promotion:'Акция',
//       status:'В наличии',
//       imageUrl: 'assets/img/dp-5.png',
//       title: 'ЛинтеЛ® АТХ–20',
//       subtitle: 'Оборудование для испытания нефтепродуктов'
//     },
//     {
//       promotion:'Акция',
//       status:'В наличии',
//       imageUrl: 'assets/img/dp-5.png',
//       title: 'ИНФРАСКАН-3150',
//       subtitle: 'Оборудование для экспресс-анализа'
//     },
//     {
//       promotion:'Акция',
//       status:'В наличии',
//       imageUrl: 'assets/img/dp-5.png',
//       title: 'Анализатор жидкости "Эксперт-001"',
//       subtitle: 'РН-метры'
//     }
//   ];
//
}
