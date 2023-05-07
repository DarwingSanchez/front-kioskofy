import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductParentRouterComponent } from './product-parent-router.component';

describe('ProductParentRouterComponent', () => {
  let component: ProductParentRouterComponent;
  let fixture: ComponentFixture<ProductParentRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductParentRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductParentRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
