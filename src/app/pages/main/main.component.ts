import { Component } from '@angular/core';
import {ImportantUpdatesEventsComponent} from './important-updates-events/important-updates-events.component';
import {MapComponent} from './map/map.component';
import {SpecialOffersComponent} from './special-offers/special-offers.component';
import {StartingPagesComponent} from './starting-pages/starting-pages.component';

@Component({
  selector: 'app-main',
  imports: [
    ImportantUpdatesEventsComponent,
    MapComponent,
    SpecialOffersComponent,
    StartingPagesComponent
  ],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
