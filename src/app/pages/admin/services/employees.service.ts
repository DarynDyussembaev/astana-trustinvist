import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

export interface EmployeeResponse {
  id: number;
  name: string;
  position: string;
  number: string;
  photo?: string;
}

export interface EmployeeRequest {
  name: string;
  position: string;
  number: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/employee`;

  public getAllEmployees(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(`${this.baseUrl}/getAllEmployee`);
  }

  public createEmployee(employeeData: EmployeeRequest, photoFile: File): Observable<EmployeeResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(employeeData));
    formData.append('photo', photoFile);
    return this.http.post<EmployeeResponse>(`${this.baseUrl}`, formData);
  }

  public updateEmployee(id: number, employeeData: EmployeeRequest, photoFile?: File): Observable<EmployeeResponse> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(employeeData));
    if (photoFile) {
      formData.append('photo', photoFile);
    }
    return this.http.put<EmployeeResponse>(`${this.baseUrl}/${id}`, formData);
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
