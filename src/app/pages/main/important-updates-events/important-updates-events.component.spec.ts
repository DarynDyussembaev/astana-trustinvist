import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantUpdatesEventsComponent } from './important-updates-events.component';

describe('ImportantUpdatesEventsComponent', () => {
  let component: ImportantUpdatesEventsComponent;
  let fixture: ComponentFixture<ImportantUpdatesEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportantUpdatesEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantUpdatesEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
