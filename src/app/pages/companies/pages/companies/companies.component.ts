import { Component } from '@angular/core';
import {AboutUsComponent} from '../../components/about-us/about-us.component';
import {CertificatesComponent} from '../../components/certificates/certificates.component';
import {EmployeesComponent} from '../../components/employees/employees.component';
import {PartnersComponent} from '../../components/partners/partners.component';

@Component({
  selector: 'app-companies',
  imports: [
    AboutUsComponent,
    CertificatesComponent,
    EmployeesComponent,
    PartnersComponent
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent {

}
