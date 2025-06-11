import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TableConfig} from './table-config.interface';
import {NgForOf, NgIf} from '@angular/common';

export interface TableAction {
  type: 'delete' | 'edit' | 'view';
  item: any;
}

@Component({
  selector: 'app-table',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() config!: TableConfig;
  @Input() trackByField: string = 'id';

  @Output() actionClicked = new EventEmitter<TableAction>();
  @Output() rowClicked = new EventEmitter<any>();

  // Поля которые содержат изображения
  private imageFields = ['imageUrl', 'photo'];

  get hasActions(): boolean {
    return !!(this.config.actions?.delete || this.config.actions?.edit || this.config.actions?.view);
  }

  trackByFn = (index: number, item: any): any => {
    return item[this.trackByField] || index;
  };

  onAction(type: 'delete' | 'edit' | 'view', item: any): void {
    this.actionClicked.emit({ type, item });
  }

  onRowClick(item: any): void {
    this.rowClicked.emit(item);
  }

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  isImageColumn(columnKey: string): boolean {
    return this.imageFields.includes(columnKey);
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    // Можно добавить placeholder изображение
    // event.target.src = 'assets/images/no-image-placeholder.png';
  }
}
