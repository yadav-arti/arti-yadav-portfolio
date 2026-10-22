import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BroucherCarouselComponent } from './broucher-carousel.component';

describe('BroucherCarouselComponent', () => {
  let component: BroucherCarouselComponent;
  let fixture: ComponentFixture<BroucherCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BroucherCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BroucherCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
