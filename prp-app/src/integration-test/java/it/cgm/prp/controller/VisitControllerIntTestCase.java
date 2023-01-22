package it.cgm.prp.controller;

import it.cgm.prp.model.Visit;
import it.cgm.prp.repository.PatientRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class VisitControllerIntTestCase extends CommonIntTestCase {

    private String baseURL;

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PatientRepository patientRepository;

    @Before
    public void setUp() {
        baseURL = "http://localhost:" + port;
        cleanEverything();
    }

    @Test
    public void whenPutSingleVisit_thenItIsUpdated() {

        //given
        Visit visit = saveSingleVisit();
        visit.setHistory(visit.getHistory() + " Updated");

        //when
        ResponseEntity<Visit> response = this.restTemplate.exchange(
                baseURL + "/api/visits/" + visit.getId(),
                HttpMethod.PUT,
                new HttpEntity<>(convertVisitToDTO(visit), new HttpHeaders()),
                Visit.class);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        Optional<Visit> visitInDbById = findVisitInDbById(visit.getId());
        assertTrue(visitInDbById.isPresent());
        assertEquals(visit.getHistory(), visitInDbById.get().getHistory());
    }

    @Test
    public void whenDeleteSingleVisitById_thenItIsDeletedFromDb() {

        //given
        Visit visit = saveSingleVisit();

        //when
        ResponseEntity<String> response = this.restTemplate.exchange(
                baseURL + "/api/visits/" + visit.getId(),
                HttpMethod.DELETE,
                new HttpEntity<>(new HttpHeaders()),
                String.class);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(String.format("Visit with id: %d was deleted", visit.getId()), response.getBody());
        assertFalse(findVisitInDbById(visit.getId()).isPresent());
    }
}
