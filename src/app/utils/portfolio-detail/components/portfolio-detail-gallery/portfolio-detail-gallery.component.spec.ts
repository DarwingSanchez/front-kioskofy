import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailGalleryComponent } from './portfolio-detail-gallery.component';

describe('PortfolioDetailGalleryComponent', () => {
  let component: PortfolioDetailGalleryComponent;
  let fixture: ComponentFixture<PortfolioDetailGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
