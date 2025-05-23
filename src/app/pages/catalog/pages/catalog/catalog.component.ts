import { Component } from '@angular/core';
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

}
