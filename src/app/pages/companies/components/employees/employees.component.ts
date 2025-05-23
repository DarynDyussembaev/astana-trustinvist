import {Component} from '@angular/core';

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  // Делаем Math доступным в шаблоне
  Math = Math;

  employees = [
    {
      title: 'Руководители',
      staff: [
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        },
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        }
      ]
    },
    {
      title: 'Отдел продаж',
      staff: [
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        },
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        },
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        },
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        }
      ]
    },
    {
      title: 'Отдел снабжения',
      staff: [
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        },
        {
          name: 'John Doe',
          position: 'Test position',
          number: '+1 234 56789',
          imageUrl: 'assets/img/employee.svg'
        }
      ]
    }
  ];

  // Отслеживание текущего слайда для каждого отдела
  currentSlides: { [key: number]: number } = {};

  // Переменные для отслеживания свайпа
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private currentDepartmentIndex: number = 0;

  constructor() {
    // Инициализируем текущий слайд для каждого отдела
    this.employees.forEach((_, index) => {
      this.currentSlides[index] = 0;
    });
  }

  // Получить количество слайдов для отдела
  getSlidesCount(departmentIndex: number): number {
    const staffCount = this.employees[departmentIndex].staff.length;
    return Math.ceil(staffCount / 2); // 2 карточки на слайд
  }

  // Переключить на конкретный слайд
  goToSlide(departmentIndex: number, slideIndex: number): void {
    this.currentSlides[departmentIndex] = slideIndex;
  }

  // Получить массив индексов слайдов для точек
  getSlideIndices(departmentIndex: number): number[] {
    return Array.from({ length: this.getSlidesCount(departmentIndex) }, (_, i) => i);
  }

  // Обработчики свайпа
  onTouchStart(event: TouchEvent, departmentIndex: number): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.currentDepartmentIndex = departmentIndex;
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.touchStartX || !this.touchStartY) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const diffX = this.touchStartX - touchEndX;
    const diffY = this.touchStartY - touchEndY;

    // Проверяем, что это горизонтальный свайп (а не вертикальный скролл)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      const currentSlide = this.currentSlides[this.currentDepartmentIndex];
      const maxSlides = this.getSlidesCount(this.currentDepartmentIndex);

      if (diffX > 0) {
        // Свайп влево - следующий слайд
        if (currentSlide < maxSlides - 1) {
          this.goToSlide(this.currentDepartmentIndex, currentSlide + 1);
        }
      } else {
        // Свайп вправо - предыдущий слайд
        if (currentSlide > 0) {
          this.goToSlide(this.currentDepartmentIndex, currentSlide - 1);
        }
      }
    }

    // Сбрасываем значения
    this.touchStartX = 0;
    this.touchStartY = 0;
  }
}
