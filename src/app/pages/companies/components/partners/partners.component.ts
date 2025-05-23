import { Component } from '@angular/core';

@Component({
  selector: 'app-partners',
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  partners = [
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 1' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 2' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 3' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 4' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 5' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 6' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 7' },
    { imageUrl: 'assets/img/partner.svg', alt: 'Partner 8' }
  ];
}
