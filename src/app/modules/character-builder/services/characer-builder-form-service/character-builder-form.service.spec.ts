import { TestBed } from '@angular/core/testing';

import { CharacterBuilderFormService } from './character-builder-form.service';

describe('CharacterBuilderFormService', () => {
  let service: CharacterBuilderFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterBuilderFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
