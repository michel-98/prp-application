import { TestBed } from '@angular/core/testing';

import { TablePatientService } from './table-patient.service';

describe('TablePatientService', () => {
  let service: TablePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
