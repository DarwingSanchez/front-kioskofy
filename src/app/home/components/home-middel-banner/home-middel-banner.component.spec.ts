import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiddelBannerComponent } from './home-middel-banner.component';

describe('HomeMiddelBannerComponent', () => {
  let component: HomeMiddelBannerComponent;
  let fixture: ComponentFixture<HomeMiddelBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMiddelBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMiddelBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
