import { TestBed } from '@angular/core/testing';

import { TableVisitService } from './table-visit.service';

describe('TableVisitService', () => {
  let service: TableVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
