import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailThumbnailsComponent } from './portfolio-detail-thumbnails.component';

describe('PortfolioDetailThumbnailsComponent', () => {
  let component: PortfolioDetailThumbnailsComponent;
  let fixture: ComponentFixture<PortfolioDetailThumbnailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailThumbnailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
