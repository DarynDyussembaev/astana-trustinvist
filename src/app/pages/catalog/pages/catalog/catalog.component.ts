import {Component} from '@angular/core';
import {CardComponent} from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-catalog',
  imports: [
    CardComponent
  ],
  templateUrl: './catalog.component.html',
  standalone: true,
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  cards = [
    {
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Делитель проб  желобчатый ДП 5',
      subtitle: 'Оборудование для дробления и измельчения'
    },
    {
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'ЛинтеЛ® АТХ–20',
      subtitle: 'Оборудование для испытания нефтепродуктов'
    },
    {
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'ИНФРАСКАН-3150',
      subtitle: 'Оборудование для экспресс-анализа'
    },
    {
      promotion: 'Акция',
      status: 'В наличии',
      imageUrl: 'assets/img/dp-5.png',
      title: 'Анализатор жидкости "Эксперт-001"',
      subtitle: 'РН-метры'
    }
  ];
}
