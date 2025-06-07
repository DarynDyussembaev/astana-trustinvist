import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CategoriesService, GetCategoriesResponse, CreateEditCategory } from '../../../services/categories.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = '';
  allCategories: GetCategoriesResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: GetCategoriesResponse | null
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Изменить' : 'Добавить';

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      parentId: [null]
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    if (this.isEditMode && this.data) {
      this.categoryForm.patchValue({
        name: this.data.name,
        parentId: null
      });
    }
  }

  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.allCategories = this.isEditMode && this.data
          ? categories.filter(cat => cat.id !== this.data!.id)
          : categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const categoryData: CreateEditCategory = {
        name: formValue.name,
        parentId: formValue.parentId || null
      };

      this.dialogRef.close(categoryData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get nameControl() {
    return this.categoryForm.get('name');
  }
}
