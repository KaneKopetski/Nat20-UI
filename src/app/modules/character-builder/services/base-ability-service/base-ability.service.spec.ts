import { TestBed } from '@angular/core/testing';

import { BaseAbilityService } from './base-ability.service';

describe('BaseAbilityService', () => {
  let service: BaseAbilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseAbilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
