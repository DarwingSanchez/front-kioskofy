import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioFiltersComponent } from './portfolio-filters.component';

describe('PortfolioFiltersComponent', () => {
  let component: PortfolioFiltersComponent;
  let fixture: ComponentFixture<PortfolioFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
