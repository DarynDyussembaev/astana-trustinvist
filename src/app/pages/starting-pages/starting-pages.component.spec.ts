import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingPagesComponent } from './starting-pages.component';

describe('StartingPagesComponent', () => {
  let component: StartingPagesComponent;
  let fixture: ComponentFixture<StartingPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartingPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
