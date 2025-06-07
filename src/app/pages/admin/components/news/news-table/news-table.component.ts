import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NewsService, NewsResponse} from '../../../services/news.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TableAction, TableComponent} from '../../../../../shared/components/table/table.component';
import {TableConfig} from '../../../../../shared/components/table/table-config.interface';
import {MatDialog} from '@angular/material/dialog';
import {NewsFormComponent} from '../news-form/news-form.component';
import {ConfirmDialogComponent} from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-news-table',
  imports: [
    TableComponent
  ],
  templateUrl: './news-table.component.html',
  styleUrl: './news-table.component.scss'
})
export class NewsTableComponent implements OnInit {
  private newsService = inject(NewsService);
  private readonly destroyRef = inject(DestroyRef);
  private _dialog: MatDialog = inject(MatDialog);

  protected isLoading: boolean = true;
  protected news: NewsResponse[] = [];

  protected tableConfig: TableConfig = {
    columns: [
      {key: 'id', label: 'ID', width: '60px'},
      {key: 'imageUrl', label: 'Изображение', width: '100px'},
      {key: 'title', label: 'Заголовок', width: '250px'},
      {key: 'content', label: 'Содержание', width: '300px'},
      {key: 'createdAt', label: 'Дата создания', width: '150px'}
    ],
    actions: {
      delete: true,
      edit: false
    }
  } as const;

  ngOnInit() {
    this.loadNews();
  }

  public onTableAction(action: TableAction): void {
    switch (action.type) {
      case 'delete':
        this.deleteNews(action.item);
        break;
    }
  }

  public onRowClick(newsItem: NewsResponse): void {
    this.editNews(newsItem);
  }

  protected openCreateDialog(): void {
    const dialogRef = this._dialog.open(NewsFormComponent, {
      width: '700px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.createNews(result.data, result.imageFile).subscribe({
          next: () => {
            this.loadNews();
          },
          error: (error) => {
            console.error('Error creating news:', error);
          }
        });
      }
    });
  }

  private loadNews(): void {
    this.newsService
      .getAllNews()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response): void => {
          this.news = response || [];
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading news:', error);
          this.news = [];
          this.isLoading = false;
        }
      });
  }

  private deleteNews(newsItem: NewsResponse): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Подтверждение удаления',
        message: `Удалить новость "${newsItem.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.newsService
          .deleteNews(newsItem.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.news = this.news.filter(n => n.id !== newsItem.id);
              this.loadNews();
            },
            error: (error) => {
              console.error('Error deleting news:', error);
            }
          });
      }
    });
  }

  private editNews(newsItem: NewsResponse): void {
    const dialogRef = this._dialog.open(NewsFormComponent, {
      width: '700px',
      data: newsItem
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newsService.updateNews(newsItem.id, result.data, result.imageFile).subscribe({
          next: () => {
            this.loadNews();
          },
          error: (error) => {
            console.error('Error editing news:', error);
          }
        });
      }
    });
  }
}
