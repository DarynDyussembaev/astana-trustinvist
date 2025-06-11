import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ProductResponse, ProductRequest } from '../../../services/products.service';
import { CategoriesService, GetCategoriesResponse } from '../../../services/categories.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = '';
  categories: GetCategoriesResponse[] = [];
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string | null = null;
  currentImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: ProductResponse | null
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Изменить' : 'Добавить';

    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: [null, [Validators.required]],
      deliveryType: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    if (this.isEditMode && this.data) {
      this.productForm.patchValue({
        name: this.data.name,
        manufacturer: this.data.manufacturer,
        description: this.data.description,
        categoryId: this.data.categoryId,
        deliveryType: this.data.deliveryType
      });

      if (this.data.imageUrl) {
        this.currentImageUrl = this.data.imageUrl;
      }
    }
  }

  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // Сбрасываем текущее изображение
      this.currentImageUrl = '';
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.imagePreview = null;
    this.currentImageUrl = '';

    // Сбрасываем input file
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onImageError(event: any): void {
    console.error('Error loading image');
    event.target.style.display = 'none';
  }

  onSubmit(): void {
    if (this.productForm.valid && (this.isEditMode || this.selectedFile || this.currentImageUrl)) {
      const formValue = this.productForm.value;
      const productData: ProductRequest = {
        name: formValue.name,
        manufacturer: formValue.manufacturer,
        description: formValue.description,
        categoryId: formValue.categoryId,
        deliveryType: formValue.deliveryType
      };

      this.dialogRef.close({
        data: productData,
        imageFile: this.selectedFile
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
