package it.cgm.prp.controller;

import it.cgm.prp.model.Patient;
import it.cgm.prp.model.Visit;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PatientControllerIntTestCase extends CommonIntTestCase {

    private String baseURL;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Before
    public void setUp() {
        baseURL = "http://localhost:" + port;
        cleanEverything();
    }

    @Test
    public void whenGetAllpatients_thenReceiveSinglePatient() {

        //given
        saveSingleRandomPatient();
        //when
        ResponseEntity<List<Patient>> response = this.restTemplate.exchange(
                baseURL + "/api/patients/",
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                new ParameterizedTypeReference<List<Patient>>() {
                });

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().size() >= 1);
    }


    @Test
    public void whenGetAllVisitsForPatientById_thenReceiveVisitsList() {

        //given
        Patient patient = saveSinglePatientWithOneVisit();

        //when
        ResponseEntity<List<Visit>> response = this.restTemplate.exchange(
                baseURL + "/api/patients/" + patient.getId() + "/visits/",
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                new ParameterizedTypeReference<List<Visit>>() {
                });

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(patient.getVisits().get(0).getId(), response.getBody().get(0).getId());
        assertEquals(patient.getVisits().get(0).getDateTime(), response.getBody().get(0).getDateTime());
        assertEquals(patient.getVisits().get(0).getHistory(), response.getBody().get(0).getHistory());
        assertEquals(patient.getVisits().get(0).getType(), response.getBody().get(0).getType());
    }

    @Test
    public void whenPostSingleVisitToAlreadyCreatedPatient_thenItIsStoredInDbAndAssignedToPatient() {

        //given
        Patient patient = saveSingleRandomPatient();
        Visit visit = createSingleVisit();

        //when
        ResponseEntity<Patient> response = this.restTemplate.exchange(
                baseURL + "/api/patients/" + patient.getId() + "/visits/",
                HttpMethod.POST,
                new HttpEntity<>(convertVisitToDTO(visit), new HttpHeaders()),
                Patient.class);

        //then
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // check response Patient
        Patient responsePatient = response.getBody();
        assertNotNull(responsePatient);
        assertNotNull(responsePatient.getId());
        assertEquals(patient.getSsn(), responsePatient.getSsn());
        TestCase.assertEquals(1, responsePatient.getVisits().size());

        Visit responseVisit = responsePatient.getVisits().get(0);
        // check response Visit
        assertNotNull(responseVisit.getId());
        assertEquals(visit.getType(), responseVisit.getType());
        assertEquals(visit.getDateTime(), responseVisit.getDateTime());
        assertEquals(visit.getHistory(), responseVisit.getHistory());

        // check saved Visit in db
        Optional<Visit> visitInDbById = findVisitInDbById(responseVisit.getId());
        assertTrue(visitInDbById.isPresent());
        Visit savedVisit = visitInDbById.get();
        assertEquals(responseVisit.getId(), savedVisit.getId());
        assertEquals(visit.getType(), savedVisit.getType());
        assertEquals(visit.getReason(), savedVisit.getReason());
        assertEquals(visit.getDateTime(), savedVisit.getDateTime());
    }

}
