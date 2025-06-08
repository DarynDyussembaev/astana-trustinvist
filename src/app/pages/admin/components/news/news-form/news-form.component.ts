import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NewsResponse, NewsRequest } from '../../../services/news.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: "./news-form.component.html",
  styleUrls: ["./news-form.component.scss"]
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  isEditMode: boolean = false;
  dialogTitle: string = '';
  selectedFile: File | null = null;
  selectedFileName: string = '';
  imagePreview: string | null = null;
  currentImageUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewsResponse | null
  ) {
    this.isEditMode = !!data;
    this.dialogTitle = this.isEditMode ? 'Изменить' : 'Добавить';

    this.newsForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data) {
      this.newsForm.patchValue({
        title: this.data.title,
        content: this.data.content
      });

      if (this.data.imageUrl) {
        this.currentImageUrl = this.data.imageUrl;
      }
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      this.currentImageUrl = '';
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.imagePreview = null;
    this.currentImageUrl = '';

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
    if (this.newsForm.valid && (this.isEditMode || this.selectedFile || this.currentImageUrl)) {
      const formValue = this.newsForm.value;
      const newsData: NewsRequest = {
        title: formValue.title,
        content: formValue.content
      };

      this.dialogRef.close({
        data: newsData,
        imageFile: this.selectedFile
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
