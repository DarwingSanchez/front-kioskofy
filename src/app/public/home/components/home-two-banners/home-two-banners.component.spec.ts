import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTwoBannersComponent } from './home-two-banners.component';

describe('HomeTwoBannersComponent', () => {
  let component: HomeTwoBannersComponent;
  let fixture: ComponentFixture<HomeTwoBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTwoBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTwoBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
