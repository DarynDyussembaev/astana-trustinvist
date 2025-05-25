import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacingAnOrderComponent } from './placing-an-order.component';

describe('PlacingAnOrderComponent', () => {
  let component: PlacingAnOrderComponent;
  let fixture: ComponentFixture<PlacingAnOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacingAnOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacingAnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
