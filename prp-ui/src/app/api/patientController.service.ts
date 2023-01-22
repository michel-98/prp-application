/**
 * Patient REST API
 * This is a REST API of Patient REST API, where you can get/add/remove/modify Patient board and its visit.
 *
 * OpenAPI spec version: v1
 * Contact: michele.antonacci1098@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Patient} from '../model/patient';
import {PatientDTO} from '../model/patientDTO';
import {Visit} from '../model/visit';
import {VisitDTO} from '../model/visitDTO';
import {Configuration} from "./configuration";
import {BASE_PATH} from "./variables";
import {CustomHttpUrlEncodingCodec} from "./encoder";


@Injectable(
  {providedIn: 'root'}
)
export class PatientControllerService {

  protected basePath = 'http://localhost:8080/api';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   * Save new Patient board
   *
   * @param patientDTO patientDTO
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createPatientUsingPOST(patientDTO: PatientDTO, observe?: 'body', reportProgress?: boolean): Observable<Patient>;
  public createPatientUsingPOST(patientDTO: PatientDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Patient>>;
  public createPatientUsingPOST(patientDTO: PatientDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Patient>>;
  public createPatientUsingPOST(patientDTO: PatientDTO, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (patientDTO === null || patientDTO === undefined) {
      throw new Error('Required parameter patientDTO was null or undefined when calling createPatientUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Patient>(`${this.basePath}/patients/`,
      patientDTO,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Save new Visit and assign it to Patient board
   *
   * @param patientId patientId
   * @param visitDTO visitDTO
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createVisitAssignedToPatientUsingPOST(patientId: number, visitDTO: VisitDTO, observe?: 'body', reportProgress?: boolean): Observable<Patient>;
  public createVisitAssignedToPatientUsingPOST(patientId: number, visitDTO: VisitDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Patient>>;
  public createVisitAssignedToPatientUsingPOST(patientId: number, visitDTO: VisitDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Patient>>;
  public createVisitAssignedToPatientUsingPOST(patientId: number, visitDTO: VisitDTO, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (patientId === null || patientId === undefined) {
      throw new Error('Required parameter patientId was null or undefined when calling createVisitAssignedToPatientUsingPOST.');
    }

    if (visitDTO === null || visitDTO === undefined) {
      throw new Error('Required parameter visitDTO was null or undefined when calling createVisitAssignedToPatientUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Patient>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/visits/`,
      visitDTO,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Delete Patient board with specific id
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deletePatientUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<string>;
  public deletePatientUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
  public deletePatientUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
  public deletePatientUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deletePatientUsingDELETE.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.delete<string>(`${this.basePath}/patients/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * View a list of all Patient boards
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllPatientsUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<Patient>>;
  public getAllPatientsUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Patient>>>;
  public getAllPatientsUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Patient>>>;
  public getAllPatientsUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Array<Patient>>(`${this.basePath}/patients/`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * View a list of all visits for a Patient with provided id
   *
   * @param patientId patientId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllVisitsInPatientUsingGET(patientId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Visit>>;
  public getAllVisitsInPatientUsingGET(patientId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Visit>>>;
  public getAllVisitsInPatientUsingGET(patientId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Visit>>>;
  public getAllVisitsInPatientUsingGET(patientId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (patientId === null || patientId === undefined) {
      throw new Error('Required parameter patientId was null or undefined when calling getAllVisitsInPatientUsingGET.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Array<Visit>>(`${this.basePath}/patients/${encodeURIComponent(String(patientId))}/visits/`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Find a Patient board info by its ssn
   *
   * @param ssn ssn
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPatientByssnUsingGET(ssn: string, observe?: 'body', reportProgress?: boolean): Observable<Patient>;
  public getPatientByssnUsingGET(ssn: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Patient>>;
  public getPatientByssnUsingGET(ssn: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Patient>>;
  public getPatientByssnUsingGET(ssn: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (ssn === null || ssn === undefined) {
      throw new Error('Required parameter ssn was null or undefined when calling getPatientByssnUsingGET.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (ssn !== undefined && ssn !== null) {
      queryParameters = queryParameters.set('ssn', <any>ssn);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Patient>(`${this.basePath}/patients`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Find a Patient board info by its id
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getPatientUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Patient>;
  public getPatientUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Patient>>;
  public getPatientUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Patient>>;
  public getPatientUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getPatientUsingGET.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.get<Patient>(`${this.basePath}/patients/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Update a Patient board with specific id
   *
   * @param id id
   * @param patientDTO patientDTO
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updatePatientUsingPUT(id: number, patientDTO: PatientDTO, observe?: 'body', reportProgress?: boolean): Observable<Patient>;
  public updatePatientUsingPUT(id: number, patientDTO: PatientDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Patient>>;
  public updatePatientUsingPUT(id: number, patientDTO: PatientDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Patient>>;
  public updatePatientUsingPUT(id: number, patientDTO: PatientDTO, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updatePatientUsingPUT.');
    }

    if (patientDTO === null || patientDTO === undefined) {
      throw new Error('Required parameter patientDTO was null or undefined when calling updatePatientUsingPUT.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.put<Patient>(`${this.basePath}/patients/${encodeURIComponent(String(id))}`,
      patientDTO,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}