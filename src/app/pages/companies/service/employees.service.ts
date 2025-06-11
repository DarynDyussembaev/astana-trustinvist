import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {Employee} from '../../../services/model/employee.models';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.api.baseUrl}/employee`;

  constructor() { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/getAllEmployee`);
  }
}
