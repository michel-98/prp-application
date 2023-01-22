package it.cgm.prp.controller;

import io.swagger.annotations.ApiOperation;
import it.cgm.prp.model.Patient;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PatientController {

    private final PatientService patientService;

    @GetMapping("/")
    @ApiOperation(value = "View a list of all Patients", response = Patient.class, responseContainer = "List",
            produces = "application/json; charset=utf-8")
    public ResponseEntity<?> getAllPatients() {
        try {
            return new ResponseEntity<>(
                    patientService.getAllPatients(),
                    HttpStatus.OK);
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @GetMapping("/{patientId}/visits/")
    @ApiOperation(value = "View a list of all visits for a Patient with provided id", response = Visit.class, responseContainer = "List")
    public ResponseEntity<?> getAllVisitsInPatient(@PathVariable Long patientId) {
        try {
            Optional<Patient> optPatient = patientService.getPatientById(patientId);
            if (optPatient.isPresent()) {
                return new ResponseEntity<>(
                        optPatient.get().getVisits(),
                        HttpStatus.OK);
            } else {
                return noPatientFoundResponse(patientId);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @PostMapping("/{patientId}/visits/")
    @ApiOperation(value = "Save new Visit and assign it to Patient", response = Patient.class)
    public ResponseEntity<?> createVisitAssignedToPatient(@PathVariable Long patientId, @RequestBody VisitDTO visitDTO) {
        try {
            Patient patient = patientService.addNewVisitToPatient(patientId, visitDTO);
            if (patient != null) {
                return new ResponseEntity<>(
                        patient,
                        HttpStatus.CREATED);
            } else {
                return noPatientFoundResponse(patientId);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse() {
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noPatientFoundResponse(Long id) {
        return new ResponseEntity<>("No patient found with id: " + id, HttpStatus.NOT_FOUND);
    }
}
