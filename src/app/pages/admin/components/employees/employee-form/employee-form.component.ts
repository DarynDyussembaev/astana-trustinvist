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
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
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
