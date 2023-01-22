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


export class Visit {
    id?: number;
    dateTime?: Date;
    type?: Visit.TypeEnum;
    reason?: Visit.ReasonEnum;
    history?: string;
}
export namespace Visit {
    export type TypeEnum = 'HOME' | 'DOCTOR_OFFICE';
    export const TypeEnum = {
        HOME: 'HOME' as TypeEnum,
        DOCTOROFFICE: 'DOCTOR_OFFICE' as TypeEnum
    };
    export type ReasonEnum = 'FIRST' | 'RECURRING' | 'URGENT';
    export const ReasonEnum = {
        FIRST: 'FIRST' as ReasonEnum,
        RECURRING: 'RECURRING' as ReasonEnum,
        URGENT: 'URGENT' as ReasonEnum
    };
}
