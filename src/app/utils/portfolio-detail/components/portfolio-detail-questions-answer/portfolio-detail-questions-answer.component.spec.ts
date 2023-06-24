import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetailQuestionsAnswerComponent } from './portfolio-detail-questions-answer.component';

describe('PortfolioDetailQuestionsAnswerComponent', () => {
  let component: PortfolioDetailQuestionsAnswerComponent;
  let fixture: ComponentFixture<PortfolioDetailQuestionsAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioDetailQuestionsAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDetailQuestionsAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
