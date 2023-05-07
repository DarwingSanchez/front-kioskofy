import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCardProductCreateComponent } from './mini-card-product-create.component';

describe('MiniCardProductCreateComponent', () => {
  let component: MiniCardProductCreateComponent;
  let fixture: ComponentFixture<MiniCardProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCardProductCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCardProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
