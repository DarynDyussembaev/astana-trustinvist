import {Component} from '@angular/core';

@Component({
  selector: 'app-certificates',
  imports: [],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {
  certificates = [
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
  ];

  private allCertificates = [
    ...this.certificates,
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
    {
      imageUrl: 'assets/img/certificate.svg',
    },
  ];

  showAllCertificates = false;

  public viewAll(): void {
    if (!this.showAllCertificates) {
      this.certificates = [...this.allCertificates];
      this.showAllCertificates = true;
    }
  }
}
