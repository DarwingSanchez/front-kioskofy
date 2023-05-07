import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCompleteComponent } from './card-complete.component';

describe('CardCompleteComponent', () => {
  let component: CardCompleteComponent;
  let fixture: ComponentFixture<CardCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
