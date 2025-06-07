import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {EmployeesService, EmployeeResponse} from '../../../services/employees.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableAction, TableComponent} from '../../../../../shared/components/table/table.component';
import {TableConfig} from '../../../../../shared/components/table/table-config.interface';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeFormComponent} from '../employee-form/employee-form.component';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-table',
  imports: [
    TableComponent
  ],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss'
})
export class EmployeeTableComponent implements OnInit {
  private employeesService = inject(EmployeesService);
  private readonly destroyRef = inject(DestroyRef);
  private _dialog: MatDialog = inject(MatDialog);

  protected isLoading: boolean = true;
  protected employees: EmployeeResponse[] = [];

  protected tableConfig: TableConfig = {
    columns: [
      {key: 'id', label: 'ID', width: '60px'},
      {key: 'photo', label: 'Фото', width: '80px'},
      {key: 'name', label: 'Имя', width: '200px'},
      {key: 'position', label: 'Должность', width: '200px'},
      {key: 'number', label: 'Телефон', width: '150px'}
    ],
    actions: {
      delete: true,
      edit: false
    }
  } as const;

  ngOnInit() {
    this.loadEmployees();
  }

  public onTableAction(action: TableAction): void {
    switch (action.type) {
      case 'delete':
        this.deleteEmployee(action.item);
        break;
    }
  }

  public onRowClick(employee: EmployeeResponse): void {
    this.editEmployee(employee);
  }

  protected openCreateDialog(): void {
    const dialogRef = this._dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.createEmployee(result.data, result.photoFile).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error creating employee:', error);
          }
        });
      }
    });
  }

  private loadEmployees(): void {
    this.employeesService
      .getAllEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response): void => {
          this.employees = response || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading employees:', error);
          this.employees = [];
          this.isLoading = false;
        }
      });
  }

  private deleteEmployee(employee: EmployeeResponse): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: `Удалить сотрудника "${employee.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.employeesService
          .deleteEmployee(employee.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.employees = this.employees.filter(e => e.id !== employee.id);
              this.loadEmployees();
            },
            error: (error) => {
              console.error('Error deleting employee:', error);
            }
          });
      }
    });
  }

  private editEmployee(employee: EmployeeResponse): void {
    const dialogRef = this._dialog.open(EmployeeFormComponent, {
      width: '600px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeesService.updateEmployee(employee.id, result.data, result.photoFile).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error editing employee:', error);
          }
        });
      }
    });
  }
}
