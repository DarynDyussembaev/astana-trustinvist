import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './pages/header/header.component';
import {StartingPagesComponent} from './pages/main/starting-pages/starting-pages.component';
import {SpecialOffersComponent} from './pages/main/special-offers/special-offers.component';
import {ImportantUpdatesEventsComponent} from './pages/main/important-updates-events/important-updates-events.component';
import {MapComponent} from './pages/main/map/map.component';
import {FooterComponent} from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, StartingPagesComponent, SpecialOffersComponent, ImportantUpdatesEventsComponent, MapComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'astana-trustinvest';
}
