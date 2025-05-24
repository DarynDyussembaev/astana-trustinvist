import { Component } from '@angular/core';
import {CardComponent} from "../../shared/components/card/card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-catalog',
    imports: [
        CardComponent,
        NgForOf
    ],
  templateUrl: './catalog.component.html',
  standalone: true,
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
}
