import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaDesignComponent } from './social-media-design.component';

describe('SocialMediaDesignComponent', () => {
  let component: SocialMediaDesignComponent;
  let fixture: ComponentFixture<SocialMediaDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
