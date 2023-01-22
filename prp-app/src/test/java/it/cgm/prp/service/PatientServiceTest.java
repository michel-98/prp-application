package it.cgm.prp.service;

import it.cgm.prp.model.Patient;
import it.cgm.prp.repository.PatientRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class PatientServiceTest {

    PatientService patientService;
    @Mock
    PatientRepository patientRepository;

    @Before
    public void init() {
        patientService = new PatientServiceImpl(patientRepository);
    }

    @Test
    public void when2PatientsInDatabase_thenGetListWithAllOfThem() {
        //given
        mockPatientInDatabase();

        //when
        List<Patient> patients = patientService.getAllPatients();

        //then
        assertEquals(2, patients.size());
    }

    private void mockPatientInDatabase() {
        when(patientRepository.findAll())
                .thenReturn(createPatientList());
    }

    private List<Patient> createPatientList() {
        List<Patient> patients = new ArrayList<>();
        IntStream.range(0, 2)
                .forEach(number -> {
                    Patient patient = new Patient();
                    patient.setId((long) number);
                    patient.setSsn((long) number + 2);
                    patient.setVisits(new ArrayList<>());
                    patients.add(patient);
                });
        return patients;
    }
}
