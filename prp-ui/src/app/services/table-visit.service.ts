import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import {Visit} from "../model/visit";
import {PatientControllerService} from "../api/patientController.service";
import {VisitControllerService} from "../api/visitController.service";
import {VisitDTO} from "../model/visitDTO";

interface VisitSearchResult {
  visits: Visit[];
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

function sort(visits: Visit[], column: SortColumn, direction: string): Visit[] {

  if (direction === '' || column === '') {
    return visits;
  } else {
    return [...visits].sort((a, b) => {
        let res: number;
        // @ts-ignore
        res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      }
    );
  }
}

function matches(visit: Visit, term: string, pipe: PipeTransform) {

  if (visit) {
    return (
      visit.reason?.toLowerCase().includes(term.toLowerCase()) ||
      visit.type?.toLowerCase().includes(term.toLowerCase()) ||
      visit.history?.toLowerCase().includes(term.toLowerCase())
    );
  } else {
    return 0
  }
}

@Injectable({providedIn: 'root'})
export class TableVisitService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _visits$ = new BehaviorSubject<Visit[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  lastPatientId: number = -1

  constructor(
    private patientService: PatientControllerService,
    private visitService: VisitControllerService,
    private pipe: DecimalPipe) {
  }

  public async getVisits(patientId: number) {
    this.lastPatientId = patientId
    const result = await this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        switchMap(() => this._search(patientId)),
        tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._visits$.next(result.visits);
        this._total$.next(result.total);
      });

    this._search$.next();
    return result
  }

  get visits$() {
    return this._visits$.asObservable();
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

  async deleteVisit(visitId: number, patientId: number): Promise<string> {
    var deletion = await this.visitService.deleteVisitUsingDELETE(visitId).toPromise()
    this._search(patientId)
    return deletion ? deletion : '';
  }

  async _search(patientId: number): Promise<VisitSearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    var visitsApi = await this.patientService.getAllVisitsInPatientUsingGET(patientId).toPromise()
    if (!visitsApi) {
      return {visits: [], total: 0}
    }

    // 1. sort
    let visits = sort(visitsApi, sortColumn, sortDirection);

    // 2. filter
    visits = visits.filter((visit) => matches(visit, searchTerm, this.pipe));
    const total = visits.length;

    // 3. paginate
    visits = visits.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return {visits, total}
  }


  async modifyVisit(visitId: number, visit: VisitDTO): Promise<boolean> {
    var result = await this.visitService.updateVisitUsingPUT(visitId, visit).toPromise()
    return !!result;
  }
}
