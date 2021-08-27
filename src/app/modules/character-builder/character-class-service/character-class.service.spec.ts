import { TestBed } from '@angular/core/testing';

import { CharacterClassService } from './character-class.service';

describe('CharacterClassService', () => {
  let service: CharacterClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
