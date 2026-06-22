import { TestBed } from '@angular/core/testing';

import { Curtomer } from './customer';

describe('Curtomer', () => {
  let service: Curtomer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Curtomer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
