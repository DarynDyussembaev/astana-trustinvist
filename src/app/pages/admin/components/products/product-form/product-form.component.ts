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
  template: `
    <div class="modal-overlay">
      <div class="modal-container">
        <button class="close-btn" (click)="onCancel()">×</button>

        <h2 class="modal-title">{{ dialogTitle }}</h2>

        <form [formGroup]="productForm" (ngSubmit)="onSubmit()">

          <div class="form-field">
            <input
              type="text"
              formControlName="name"
              placeholder="Наименование"
              class="form-input">
          </div>

          <div class="form-field">
            <input
              type="text"
              formControlName="manufacturer"
              placeholder="Производитель"
              class="form-input">
          </div>

          <div class="form-field">
            <textarea
              formControlName="description"
              placeholder="Описание"
              rows="3"
              class="form-input"></textarea>
          </div>

          <div class="form-field">
            <select formControlName="categoryId" class="form-select">
              <option value="" disabled>Категория</option>
              <option *ngFor="let category of categories" [value]="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="file-upload-section">
            <div class="file-upload-left">
              <span class="file-label">Изображение</span>
            </div>
            <div class="file-upload-right">
              <label for="imageFile" class="file-upload-btn">Добавить</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                (change)="onFileSelected($event)"
                class="file-input-hidden">
            </div>
          </div>

          <!-- Превью изображения -->
          <div *ngIf="imagePreview || currentImageUrl" class="image-preview-section">
            <div class="image-preview-container">
              <img
                [src]="imagePreview || currentImageUrl"
                alt="Превью изображения"
                class="image-preview"
                (error)="onImageError($event)">
              <button
                type="button"
                class="remove-image-btn"
                (click)="removeImage()">×</button>
            </div>
            <div class="image-info">
              <span *ngIf="selectedFileName">{{ selectedFileName }}</span>
              <span *ngIf="!selectedFileName && currentImageUrl">Текущее изображение</span>
            </div>
          </div>

          <div class="form-field">
            <select formControlName="deliveryType" class="form-select">
              <option value="" disabled>Тип доставки</option>
              <option value="DELIVERY">Доставка</option>
              <option value="PICKUP">Самовывоз</option>
            </select>
          </div>

          <button
            type="submit"
            [disabled]="productForm.invalid || (!isEditMode && !selectedFile && !currentImageUrl)"
            class="submit-button">
            {{ isEditMode ? 'Изменить' : 'Добавить' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-container {
      background: white;
      border-radius: 8px;
      padding: 40px;
      width: 90%;
      max-width: 500px;
      position: relative;
      max-height: 90vh;
      overflow-y: auto;
    }

    .close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #999;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #333;
    }

    .modal-title {
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 40px 0;
      color: #333;
    }

    .form-field {
      margin-bottom: 20px;
    }

    .form-input, .form-select {
      width: 100%;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      background: white;
    }

    .form-input:focus, .form-select:focus {
      border-color: #007bff;
    }

    .form-input::placeholder {
      color: #999;
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
    }

    .file-upload-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 16px 0;
    }

    .file-upload-left {
      flex: 1;
    }

    .file-label {
      font-size: 16px;
      color: #333;
    }

    .file-upload-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .file-upload-btn {
      background: white;
      border: 1px solid #333;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      color: #333;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .file-upload-btn:hover {
      background: #f8f9fa;
    }

    .file-input-hidden {
      display: none;
    }

    .image-preview-section {
      margin-bottom: 20px;
    }

    .image-preview-container {
      position: relative;
      display: inline-block;
      margin-bottom: 8px;
    }

    .image-preview {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #ddd;
      display: block;
    }

    .remove-image-btn {
      position: absolute;
      top: -8px;
      right: -8px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .remove-image-btn:hover {
      background: #ff2222;
    }

    .image-info {
      font-size: 14px;
      color: #666;
    }

    .submit-button {
      width: 100%;
      background: #ff8c00;
      color: white;
      border: none;
      padding: 16px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-top: 20px;
    }

    .submit-button:hover:not(:disabled) {
      background: #e67e00;
    }

    .submit-button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    textarea.form-input {
      resize: vertical;
      min-height: 80px;
    }
  `]
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
