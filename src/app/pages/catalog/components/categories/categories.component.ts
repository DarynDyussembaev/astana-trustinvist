import { Component, HostListener } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

interface MenuItem {
  name: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-categories',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  menuItems: MenuItem[] = [
    {
      name: 'Приборы контроля качества строительных материалов',
      children: []
    },
    {
      name: 'Приборы для лабораторий контроля качества дорожных материалов',
      children: []
    },
    {
      name: 'Оборудование для пожарных лабораторий',
      expanded: false,
      children: [
        { name: 'Оборудование для испытания асфальта' },
        { name: 'Оборудование для испытания песка, щебня и грунта' }
      ]
    },
    {
      name: 'Геодезическое оборудование',
      expanded: false,
      children: [
        { name: 'Приборы для дорожной разметки и знаков' },
        { name: 'Вехи' },
        { name: 'Дальномеры' },
        { name: 'Дорожные колеса' }
      ]
    },
    {
      name: 'Весы',
      children: []
    },
    {
      name: 'Лабораторная посуда',
      children: []
    }
  ];

  isMenuOpen: boolean = false;

  toggleExpanded(item: MenuItem): void {
    if (item.children && item.children.length > 0) {
      item.expanded = !item.expanded;
    }
  }

  selectItem(item: MenuItem): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth >= 1024) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileMenu = target.closest('.mobile-menu');

    if (!mobileMenu && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
