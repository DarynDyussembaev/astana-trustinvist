import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ProductsService, ProductResponse} from '../../../services/products.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableAction, TableComponent} from '../../../../../shared/components/table/table.component';
import {TableConfig} from '../../../../../shared/components/table/table-config.interface';
import {MatDialog} from '@angular/material/dialog';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-table',
  imports: [
    TableComponent
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent implements OnInit {
  private productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);
  private _dialog: MatDialog = inject(MatDialog);

  protected isLoading: boolean = true;
  protected products: ProductResponse[] = [];
  protected currentPage: number = 0;
  protected pageSize: number = 10;
  protected totalElements: number = 0;

  protected tableConfig: TableConfig = {
    columns: [
      {key: 'id', label: 'ID', width: '60px'},
      {key: 'imageUrl', label: 'Фото', width: '80px'},
      {key: 'name', label: 'Название', width: '200px'},
      {key: 'manufacturer', label: 'Производитель', width: '150px'},
      {key: 'description', label: 'Описание', width: '250px'},
      {key: 'deliveryType', label: 'Тип доставки', width: '120px'}
    ],
    actions: {
      delete: true,
      edit: false
    }
  } as const;

  ngOnInit() {
    this.loadProducts();
  }

  public onTableAction(action: TableAction): void {
    switch (action.type) {
      case 'delete':
        this.deleteProduct(action.item);
        break;
    }
  }

  public onRowClick(product: ProductResponse): void {
    this.editProduct(product);
  }

  protected openCreateDialog(): void {
    const dialogRef = this._dialog.open(ProductFormComponent, {
      width: '800px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.createProduct(result.data, result.imageFile).subscribe({
          next: () => {
            this.loadProducts();
          },
          error: (error) => {
            console.error('Error creating product:', error);
          }
        });
      }
    });
  }

  private loadProducts(): void {
    this.productsService
      .getAllProducts(this.currentPage, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response): void => {
          this.products = response.content || [];
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.products = [];
          this.isLoading = false;
        }
      });
  }

  private deleteProduct(product: ProductResponse): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: `Удалить продукт "${product.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productsService
          .deleteProduct(product.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.products = this.products.filter(p => p.id !== product.id);
              this.loadProducts();
            },
            error: (error) => {
              console.error('Error deleting product:', error);
            }
          });
      }
    });
  }

  private editProduct(product: ProductResponse): void {
    const dialogRef = this._dialog.open(ProductFormComponent, {
      width: '800px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productsService.updateProduct(product.id, result.data, result.imageFile).subscribe({
          next: () => {
            this.loadProducts();
          },
          error: (error) => {
            console.error('Error editing product:', error);
          }
        });
      }
    });
  }
}
