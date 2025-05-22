import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  standalone: true,
  styleUrl: './map.component.scss'
})
export class MapComponent {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngAfterViewInit() {
    this.loadYandexMap();
  }

  loadYandexMap() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6f45a91fc54e1053d4d252cab59df9bf0d1c338a79628085a527b790e39709c6&amp;width=100%25&amp;height=380&amp;lang=ru_RU&amp;scroll=true';

    this.mapContainer.nativeElement.appendChild(script);
  }
}
