import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailDescriptionComponent } from './portfolio-detail-description.component';

describe('PortfolioDetailDescriptionComponent', () => {
  let component: PortfolioDetailDescriptionComponent;
  let fixture: ComponentFixture<PortfolioDetailDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
