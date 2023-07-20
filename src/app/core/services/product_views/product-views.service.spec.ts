import { TestBed } from '@angular/core/testing';

import { ProductViewsService } from './product-views.service';

describe('ProductViewsService', () => {
  let service: ProductViewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductViewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
