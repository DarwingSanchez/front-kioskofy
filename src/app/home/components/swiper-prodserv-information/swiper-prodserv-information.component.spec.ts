import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperProdservInformationComponent } from './swiper-prodserv-information.component';

describe('SwiperProdservInformationComponent', () => {
  let component: SwiperProdservInformationComponent;
  let fixture: ComponentFixture<SwiperProdservInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperProdservInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperProdservInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
