import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.component.html',
  standalone: true,
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  @Input() image: string = '';
  @Input() date: string = '';
  @Input() title: string = '';
  @Input() description: string = '';

  hovered: boolean = false;

  onMouseEnter() {
    this.hovered = true;
  }

  onMouseLeave() {
    this.hovered = false;
  }
}
