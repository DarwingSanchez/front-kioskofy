import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailRatingsComponent } from './portfolio-detail-ratings.component';

describe('PortfolioDetailRatingsComponent', () => {
  let component: PortfolioDetailRatingsComponent;
  let fixture: ComponentFixture<PortfolioDetailRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailRatingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
