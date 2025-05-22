import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  standalone: true,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() promotion: string = '';
  @Input() status: string = '';
}
