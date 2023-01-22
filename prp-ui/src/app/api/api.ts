import {PatientControllerService} from './patientController.service';
import {VisitControllerService} from './visitController.service';

export * from './patientController.service';
export * from './visitController.service';
export const APIS = [PatientControllerService, VisitControllerService];
