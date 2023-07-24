import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailFAQComponent } from './portfolio-detail-faq.component';

describe('PortfolioDetailFAQComponent', () => {
  let component: PortfolioDetailFAQComponent;
  let fixture: ComponentFixture<PortfolioDetailFAQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailFAQComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioDetailFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
