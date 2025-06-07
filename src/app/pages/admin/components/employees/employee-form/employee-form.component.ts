import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EmployeeResponse, EmployeeRequest } from '../../../services/employees.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="modal-overlay">
      <div class="modal-container">
        <button class="close-btn" (click)="onCancel()">×</button>

        <h2 class="modal-title">{{ dialogTitle }}</h2>

        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">

          <div class="form-field">
            <input
              type="text"
              formControlName="name"
              placeholder="Имя сотрудника"
              class="form-input">
          </div>

          <div class="form-field">
            <input
              type="text"
              formControlName="position"
              placeholder="Должность"
              class="form-input">
          </div>

          <div class="form-field">
            <input
              type="tel"
              formControlName="number"
              placeholder="Номер телефона"
              class="form-input">
          </div>

          <div class="file-upload-section">
            <div class="file-upload-left">
              <span class="file-label">Фото</span>
            </div>
            <div class="file-upload-right">
              <label for="photoFile" class="file-upload-btn">Добавить</label>
              <input
                type="file"
                id="photoFile"
                accept="image/*"
                (change)="onFileSelected($event)"
                class="file-input-hidden">
            </div>
          </div>

          <!-- Превью фото -->
          <div *ngIf="photoPreview || currentPhotoUrl" class="photo-preview-section">
            <div class="photo-preview-container">
              <img
                [src]="photoPreview || currentPhotoUrl"
                alt="Превью фото"
                class="photo-preview"
                (error)="onImageError($event)">
              <button
                type="button"
                class="remove-photo-btn"
                (click)="removePhoto()">×</button>
            </div>
            <div class="photo-info">
              <span *ngIf="selectedFileName">{{ selectedFileName }}</span>
              <span *ngIf="!selectedFileName && currentPhotoUrl">Текущее фото</span>
            </div>
          </div>

          <button
            type="submit"
            [disabled]="employeeForm.invalid || (!isEditMode && !selectedFile && !currentPhotoUrl)"
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

    .form-input {
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

    .form-input:focus {
      border-color: #007bff;
    }

    .form-input::placeholder {
      color: #999;
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

    .photo-preview-section {
      margin-bottom: 20px;
    }

    .photo-preview-container {
      position: relative;
      display: inline-block;
      margin-bottom: 8px;
    }

    .photo-preview {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #ddd;
      display: block;
    }

    .remove-photo-btn {
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

    .remove-photo-btn:hover {
      background: #ff2222;
    }

    .photo-info {
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
  `]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  photoPreview: string | null = null;
  currentPhotoUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeResponse | null
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Изменить' : 'Добавить';

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data) {
      this.employeeForm.patchValue({
        name: this.data.name,
        position: this.data.position,
        number: this.data.number
      });

      if (this.data.photo) {
        this.currentPhotoUrl = this.data.photo;
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Создаем превью
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // Сбрасываем текущее фото
      this.currentPhotoUrl = '';
    }
  }

  removePhoto(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.photoPreview = null;
    this.currentPhotoUrl = '';

    // Сбрасываем input file
    const fileInput = document.getElementById('photoFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onImageError(event: any): void {
    console.error('Error loading photo');
    event.target.style.display = 'none';
  }

  onSubmit(): void {
    if (this.employeeForm.valid && (this.isEditMode || this.selectedFile || this.currentPhotoUrl)) {
      const formValue = this.employeeForm.value;
      const employeeData: EmployeeRequest = {
        name: formValue.name,
        position: formValue.position,
        number: formValue.number
      };

      this.dialogRef.close({
        data: employeeData,
        photoFile: this.selectedFile
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
