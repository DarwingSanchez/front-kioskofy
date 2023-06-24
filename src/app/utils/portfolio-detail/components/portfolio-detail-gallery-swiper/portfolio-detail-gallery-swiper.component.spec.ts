import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailGallerySwiperComponent } from './portfolio-detail-gallery-swiper.component';

describe('PortfolioDetailGallerySwiperComponent', () => {
  let component: PortfolioDetailGallerySwiperComponent;
  let fixture: ComponentFixture<PortfolioDetailGallerySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailGallerySwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailGallerySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
