import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailLocationComponent } from './portfolio-detail-location.component';

describe('PortfolioDetailLocationComponent', () => {
  let component: PortfolioDetailLocationComponent;
  let fixture: ComponentFixture<PortfolioDetailLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
