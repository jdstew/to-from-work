import { TestBed } from '@angular/core/testing';

import { UsnoService } from './usno.service';

describe('UsnoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsnoService = TestBed.get(UsnoService);
    expect(service).toBeTruthy();
  });
});
