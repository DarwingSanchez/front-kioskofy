import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailDataComponent } from './portfolio-detail-data.component';

describe('PortfolioDetailDataComponent', () => {
  let component: PortfolioDetailDataComponent;
  let fixture: ComponentFixture<PortfolioDetailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
