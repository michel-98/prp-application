package it.cgm.prp.service;

import it.cgm.prp.model.Patient;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;

    @Override
    @Transactional
    public List<Patient> getAllPatients() {
        List<Patient> patientList = new ArrayList<>();
        patientRepository.findAll().forEach(patientList::add);
        return patientList;
    }

    @Override
    @Transactional
    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    @Override
    @Transactional
    public Patient addNewVisitToPatient(Long patientId, VisitDTO visitDTO) {
        Optional<Patient> patientById = patientRepository.findById(patientId);
        if (patientById.isPresent()) {
            Patient patient = patientById.get();
            patient.addVisit(convertDTOToVisit(visitDTO));
            return patientRepository.save(patient);
        } else {
            return null;
        }
    }

    private Visit convertDTOToVisit(VisitDTO visitDTO) {
        Visit visit = new Visit();
        visit.setDateTime(visitDTO.getDateTime());
        visit.setType(visitDTO.getType());
        visit.setReason(visitDTO.getReason());
        visit.setHistory(visitDTO.getHistory());
        return visit;
    }
}
