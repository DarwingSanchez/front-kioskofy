import { TestBed } from '@angular/core/testing';

import { ResorcesService } from './resorces.service';

describe('ResorcesService', () => {
  let service: ResorcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResorcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
