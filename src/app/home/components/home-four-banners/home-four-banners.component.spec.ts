import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFourBannersComponent } from './home-four-banners.component';

describe('HomeFourBannersComponent', () => {
  let component: HomeFourBannersComponent;
  let fixture: ComponentFixture<HomeFourBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFourBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFourBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
