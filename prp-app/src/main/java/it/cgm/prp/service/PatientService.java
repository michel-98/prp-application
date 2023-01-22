package it.cgm.prp.service;

import it.cgm.prp.model.Patient;
import it.cgm.prp.model.VisitDTO;

import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<Patient> getAllPatients();

    Optional<Patient> getPatientById(Long id);

    Patient addNewVisitToPatient(Long patientId, VisitDTO visitDTO);
}
