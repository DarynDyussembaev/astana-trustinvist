import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTableComponent } from './news-table.component';

describe('NewsTableComponent', () => {
  let component: NewsTableComponent;
  let fixture: ComponentFixture<NewsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
