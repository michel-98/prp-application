import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {
  NgbModalModule,
  NgbModule,
  NgbPaginationModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from "./services/sortable.directive";
import {TableComponent} from './table/table.component';
import {FormsModule} from "@angular/forms";
import {PatientControllerService} from "./api/patientController.service";
import {HttpClientModule} from "@angular/common/http";
import {VisitControllerService} from "./api/visitController.service";
import {DecimalPipe} from "@angular/common";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NgbdSortableHeader,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    HttpClientModule,
    NgbTooltipModule,
    NgbModalModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [PatientControllerService, VisitControllerService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
