import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren} from '@angular/core';

import {NgbdSortableHeader, SortEvent} from "../services/sortable.directive";
import {Observable} from "rxjs";
import {Patient} from "../model/patient";
import {TablePatientService} from "../services/table-patient.service";
import {TableVisitService} from "../services/table-visit.service";
import {Visit} from "../model/visit";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {VisitDTO} from "../model/visitDTO";
import TypeEnum = Visit.TypeEnum;
import ReasonEnum = VisitDTO.ReasonEnum;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [TablePatientService, DecimalPipe],
})
export class TableComponent {
  visitModel = new Visit()
  isInModifica = false
  patientView = true
  patients: Observable<Patient[]>;
  totalPatients: Observable<number>;
  visits: Observable<Visit[]>;
  totalVisits: Observable<number>;
  lastPatientId: number = -1
  closeResult = ''

  public visitTypes = Object.values(TypeEnum);
  public visitReasons = Object.values(ReasonEnum);

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(public patientsService: TablePatientService, public visitsService: TableVisitService, private modalService: NgbModal) {
    this.patients = patientsService.patients$;
    this.totalPatients = patientsService.total$;
    this.visits = visitsService.visits$;
    this.totalVisits = visitsService.total$
  }


  onPatientsSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.patientsService.sortColumn = column;
    this.patientsService.sortDirection = direction;
  }

  onVisitsSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.patientsService.sortColumn = column;
    this.patientsService.sortDirection = direction;
  }

  renderVisitsPatient(patientId: number | undefined) {
    console.log(patientId)
    if (!patientId) {
      alert("Patient not found")
    } else {
      this.visitsService.getVisits(patientId).then(r => {
      }).finally(() => {
        this.patientView = false;
        this.lastPatientId = patientId ? patientId : -1;
        this.visits = this.visitsService.visits$
        this.totalVisits = this.visitsService.total$
      })

    }
  }

  modify(visit: Visit, content: any) {
    this.lastPatientId
    this.isInModifica = true
    this.open(content)
    this.visitModel = visit
  }

  delete(visit: Visit) {
    if (!visit.id) {
      alert("Visit not found")
    } else {
      this.visitsService.deleteVisit(visit.id, this.lastPatientId).then()
      this.patientView = true;
      this.patientView = false;
      this.renderVisitsPatient(this.lastPatientId)
    }
  }

  addVisit(patient: Patient, content: any) {
    this.lastPatientId = patient.id ? patient.id : -1
    this.isInModifica = false
    this.open(content)
    this.visitModel = new Visit()
  }

  goBack() {
    this.lastPatientId = -1
    this.patientView = true
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${TableComponent.getDismissReason(reason)}`;
      },
    );
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmitVisit() {
    console.log(this.visitModel)
    if (this.isInModifica) {
      if (this.visitModel.id) {
        this.visitsService.modifyVisit(this.visitModel.id, this.visitModel)
      } else {
        alert("Error, try later")
      }
    } else {
      this.patientsService.createVisitAssignedToPatient(this.lastPatientId, this.visitModel)
        .then(r => console.log(r))
    }
  }
}
