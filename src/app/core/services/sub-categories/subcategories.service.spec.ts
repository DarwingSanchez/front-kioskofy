import { TestBed } from '@angular/core/testing';

import { SubCategoriesService } from './subcategories.service';

describe('SubCategoriesService', () => {
  let service: SubCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
