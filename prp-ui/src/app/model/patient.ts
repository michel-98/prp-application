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
import { Visit } from './visit';


export class Patient {
    id?: number;
    name?: string;
    surname?: string;
    birthDate?: string;
    ssn?: number;
    visits?: Array<Visit>;
}
