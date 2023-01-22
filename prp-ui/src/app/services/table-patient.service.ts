import {Injectable, OnInit, PipeTransform} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import {Patient} from "../model/patient";
import {Visit} from "../model/visit";
import {PatientControllerService} from "../api/patientController.service";
import {VisitDTO} from "../model/visitDTO";

interface PatientSearchResult {
  patients: Patient[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: Array<Visit> | string | number, v2: Array<Visit> | string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(patients: Patient[], column: SortColumn, direction: string): Patient[] {

  if (direction === '' || column === '') {
    return patients;
  } else {
    return [...patients].sort((a, b) => {
        let res: number;
        // @ts-ignore
        res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      }
    );
  }
}

function matches(patient: Patient, term: string, pipe: PipeTransform) {

  if (patient) {
    return (
      patient.name?.toLowerCase().includes(term.toLowerCase()) ||
      pipe.transform(patient.ssn).includes(term) ||
      patient.surname?.toLowerCase().includes(term.toLowerCase())
    );
  }

}

@Injectable({providedIn: 'root'})
export class TablePatientService implements OnInit {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _patients$ = new BehaviorSubject<Patient[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private patientService: PatientControllerService, private pipe: DecimalPipe) {
    this.ngOnInit()
  }

  async ngOnInit() {
    console.log("onInit")


    await this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._patients$.next(result.patients);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get patients$() {
    return this._patients$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  async createVisitAssignedToPatient(patientId: number, visit: VisitDTO): Promise<boolean> {
    var result = await this.patientService.createVisitAssignedToPatientUsingPOST(patientId, visit).toPromise()
    return !!result;
  }

  async _search(): Promise<PatientSearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    var patientsApi = await this.patientService.getAllPatientsUsingGET().toPromise()
    if (!patientsApi) {
      return {patients: [], total: 0}
    }

    // 1. sort
    let patients = sort(patientsApi, sortColumn, sortDirection);

    // 2. filter
    patients = patients.filter((patient) => matches(patient, searchTerm, this.pipe));
    const total = patients.length;

    // 3. paginate
    patients = patients.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return {patients, total}
  }
}
