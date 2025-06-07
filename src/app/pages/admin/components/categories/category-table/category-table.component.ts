import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CategoriesService, GetCategoriesResponse} from '../../../services/categories.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableAction, TableComponent} from '../../../../../shared/components/table/table.component';
import {TableConfig} from '../../../../../shared/components/table/table-config.interface';
import {MatDialog} from '@angular/material/dialog';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-table',
  imports: [
    TableComponent
  ],
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.scss'
})
export class CategoryTableComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);
  private _dialog: MatDialog = inject(MatDialog);

  protected isLoading: boolean = true;
  protected categories: GetCategoriesResponse[] | null = [];

  protected tableConfig: TableConfig = {
    columns: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Наименование', width: '152px'},
      {key: 'parentCategory', label: 'Родительская категория', width: '200px'}
    ],
    actions: {
      delete: true,
      edit: false
    }
  } as const;

  ngOnInit() {
    this.loadCategories()
  }

  public onTableAction(action: TableAction): void {
    switch (action.type) {
      case 'delete':
        this.deleteCategory(action.item);
        break;
    }
  }

  public onRowClick(category: GetCategoriesResponse): void {
    this.editCategory(category);
  }

  protected openCreateDialog(): void {
    const dialogRef = this._dialog.open(CategoryFormComponent, {
      width: '662px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriesService.createCategory(result).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (error) => {
            console.error('Error creating category:', error);
          }
        });
      }
    });
  }

  private loadCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: GetCategoriesResponse[]): void => {
          this.categories = response || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading categories:', error);
          this.categories = [];
          this.isLoading = false;
        }
      });
  }

  private deleteCategory(category: GetCategoriesResponse): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: `Удалить категорию "${category.name}"?`
      }
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.categoriesService
          .deleteCategory(category.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.categories = this.categories!.filter(c => c.id !== category.id);
              console.log('Удаление категории:', category);
              this.loadCategories();
            },
            error: (error) => {
              console.error('Error deleting category:', error);
            }
          })
      }
    })
  }

  private editCategory(category: GetCategoriesResponse): void {
    const dialogRef = this._dialog.open(CategoryFormComponent, {
      width: '662px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriesService.editCategory(category.id, result).subscribe({
          next: () => {
            this.loadCategories();
          },
          error: (error) => {
            console.error('Error editing category:', error);
          }
        })
      }
    })
  }
}
