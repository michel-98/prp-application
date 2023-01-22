package it.cgm.prp.controller;

import it.cgm.prp.model.Patient;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.model.VisitReason;
import it.cgm.prp.model.VisitType;
import it.cgm.prp.repository.PatientRepository;
import it.cgm.prp.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:test",
        "spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.H2Dialect"
})
public class CommonIntTestCase {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private VisitRepository visitRepository;

    protected Patient createSinglePatient() {
        Patient patient = new Patient();
        int random = (int) (Math.random() * 100 + 1);
        patient.setName("Test Patient " + random);
        patient.setVisits(new ArrayList<>());
        return patient;
    }

    protected Visit createSingleVisit() {
        Visit visit = new Visit();
        int random = (int) (Math.random() * 100 + 1);
        visit.setHistory("Test Visit " + random);
        visit.setDateTime(LocalDateTime.now());
        visit.setType(VisitType.HOME);
        visit.setReason(VisitReason.FIRST);
        return visit;
    }

    protected VisitDTO convertVisitToDTO(Visit visit) {
        return VisitDTO.builder()
                .history(visit.getHistory())
                .reason(visit.getReason())
                .type(visit.getType())
                .dateTime(visit.getDateTime())
                .build();
    }

    protected Patient saveSingleRandomPatient() {
        return patientRepository.save(createSinglePatient());
    }

    protected void cleanEverything() {
        patientRepository.deleteAll();
        visitRepository.deleteAll();
    }

    protected Patient saveSinglePatientWithOneVisit() {
        Patient patient = createSinglePatient();
        Visit visit = createSingleVisit();
        patient.addVisit(visit);
        return patientRepository.save(patient);
    }

    protected Visit saveSingleVisit() {
        return visitRepository.save(createSingleVisit());
    }

    protected Optional<Visit> findVisitInDbById(Long id) {
        return visitRepository.findById(id);
    }
}
