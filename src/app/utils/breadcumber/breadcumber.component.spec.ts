import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumberComponent } from './breadcumber.component';

describe('BreadcumberComponent', () => {
  let component: BreadcumberComponent;
  let fixture: ComponentFixture<BreadcumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
