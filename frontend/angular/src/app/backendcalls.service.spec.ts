import { TestBed } from '@angular/core/testing';

import { BackendcallsService } from './backendcalls.service';

describe('BackendcallsService', () => {
  let service: BackendcallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendcallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
