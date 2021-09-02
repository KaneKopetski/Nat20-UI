import { TestBed } from '@angular/core/testing';

import { DeityService } from './deity.service';

describe('DeityService', () => {
  let service: DeityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
