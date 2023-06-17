import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddelBannerComponent } from './middel-banner.component';

describe('MiddelBannerComponent', () => {
  let component: MiddelBannerComponent;
  let fixture: ComponentFixture<MiddelBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddelBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddelBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
