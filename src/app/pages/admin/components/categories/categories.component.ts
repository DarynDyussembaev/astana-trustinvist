import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CategoriesService, GetCategoriesResponse} from '../../services/categories.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableAction, TableComponent} from '../../../../shared/components/table/table.component';
import {TableConfig} from '../../../../shared/components/table/table-config.interface';

@Component({
  selector: 'app-categories',
  imports: [
    TableComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  protected isLoading: boolean = true;
  protected categories: GetCategoriesResponse[] | null = [];

  protected tableConfig: TableConfig = {
    columns: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Наименование', width: '152px'}
    ],
    actions: {
      delete: true,
      edit: true
    }
  };

  ngOnInit() {
    this.loadCategories()
  }

  public onTableAction(action: TableAction): void {
    switch (action.type) {
      case 'delete':
        this.deleteCategory(action.item);
        break;
      case 'edit':
        this.editCategory(action.item);
        break;
    }
  }

  private loadCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: GetCategoriesResponse[]): void => {
          if (response) {
            this.categories = response
            this.isLoading = false;
          } else {
            this.categories = [];
            this.isLoading = false;
          }
        }
      })
  }

  private deleteCategory(category: GetCategoriesResponse): void {
    if (confirm(`Удалить категорию "${category.name}"?`)) {
      this.categoriesService
        .deleteCategory(category.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.categories = this.categories!.filter(c => c.id !== category.id);
            console.log('Удаление категории:', category);
            this.loadCategories();
          }
        })
    }
  }

  private editCategory(category: GetCategoriesResponse): void {
    console.log('Редактирование категории:', category);
  }
}
