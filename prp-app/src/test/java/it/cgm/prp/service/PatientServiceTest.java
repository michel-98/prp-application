package it.cgm.prp.service;

import it.cgm.prp.model.Patient;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.model.VisitReason;
import it.cgm.prp.model.VisitType;
import it.cgm.prp.repository.PatientRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import static it.cgm.prp.service.VisitServiceTest.convertDTOToVisit;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PatientServiceTest {

    PatientService patientService;
    @Mock
    PatientRepository patientRepository;
    private final VisitDTO visitDTO = new VisitDTO(LocalDateTime.now(), VisitType.DOCTOR_OFFICE, VisitReason.RECURRING, "test");


    @Before
    public void init() {
        patientService = new PatientServiceImpl(patientRepository);
    }

    @Test
    public void when2PatientsInDatabase_thenGetListWithAllOfThem() {
        //given
        mockPatientsInDatabase();

        //when
        List<Patient> patients = patientService.getAllPatients();

        //then
        assertEquals(2, patients.size());
    }

    @Test
    public void whenGetOnePatient_thenGetListOfItsVisits() {
        //given
        mockPatientInDatabase();

        //when
        Optional<Patient> patient = patientService.getPatientById(0L);

        //then
        assertTrue(patient.isPresent());
        assertEquals(2, patient.get().getVisits().size());
    }

    @Test
    public void whenSaveOneVisitToPatient_thenIsSavedInDB() {
        //given
        mockPatientInDatabase();
        mockSavePatientInDatabase();
        String historyTest = "test";

        //when
        Patient patient = patientService.addNewVisitToPatient(1L, visitDTO);

        //then
        assertEquals(1, patient.getVisits().size());
        assertEquals(historyTest, patient.getVisits().get(0).getHistory());
    }

    private void mockPatientsInDatabase() {
        when(patientRepository.findAll())
                .thenReturn(createPatientList());
    }

    private void mockPatientInDatabase() {
        when(patientRepository.findById(anyLong()))
                .thenReturn(Optional.ofNullable(createPatientList().get(0)));
    }

    private void mockSavePatientInDatabase() {
        when(patientRepository.save(any()))
                .thenReturn(createPatientList().get(1));
    }

    private List<Patient> createPatientList() {
        List<Patient> patients = new ArrayList<>();
        List<Visit> visits = new ArrayList<>();
        IntStream.range(0, 2)
                .forEach(number -> {
                    Visit visit = new Visit();
                    visit.setId((long) number);
                    visit.setType(VisitType.DOCTOR_OFFICE);
                    visit.setReason(VisitReason.RECURRING);
                    visit.setDateTime(LocalDateTime.now());
                    visit.setHistory("" + number);
                    visits.add(visit);
                });
        IntStream.range(0, 2)
                .forEach(number -> {
                    Patient patient = new Patient();
                    patient.setId((long) number);
                    patient.setSsn((long) number + 2);
                    patient.setVisits(new ArrayList<>());
                    patients.add(patient);
                });
        patients.get(0).setVisits(visits);
        patients.get(1).setVisits(List.of(convertDTOToVisit(visitDTO)));
        return patients;
    }

}
