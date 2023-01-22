package it.cgm.prp.service;

import it.cgm.prp.model.Visit;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.model.VisitReason;
import it.cgm.prp.model.VisitType;
import it.cgm.prp.repository.VisitRepository;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class VisitServiceTest {


    VisitService visitService;
    @Mock
    VisitRepository visitRepository;
    private final VisitDTO visitDTO = new VisitDTO(LocalDateTime.now(), VisitType.DOCTOR_OFFICE, VisitReason.RECURRING, "test");


    @Before
    public void init() {
        visitService = new VisitServiceImpl(visitRepository);
    }

    @Test
    public void whenUpdateVisits_thenUpdatesAreStoredInDB() {
        //given
        mockSaveVisitInDatabase();

        //when
        Visit visit = visitService.updateVisit(createVisitList().get(0),visitDTO);

        //then
        assertEquals(visit.getDateTime(), visitDTO.getDateTime());
        assertEquals(visit.getType(), visitDTO.getType());
        assertEquals(visit.getReason(), visitDTO.getReason());
        assertEquals(visit.getHistory(), visitDTO.getHistory());
    }

    @Test
    public void whenDeleteVisit_thenGetOnlyOneVisit() {
        //given
        mockVisitInDatabase();

        //when
        visitService.deleteVisit(createVisitList().get(0));


        //then
        assertNull(visitService.getVisitById(1L));
    }

    private void mockVisitInDatabase() {
        when(visitRepository.findById(anyLong()))
                .thenReturn(null);
    }

    private void mockSaveVisitInDatabase() {
        when(visitRepository.save(any(Visit.class)))
                .thenReturn(convertDTOToVisit(visitDTO));
    }

    private List<Visit> createVisitList() {
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
        return visits;
    }

    public static Visit convertDTOToVisit(VisitDTO visitDTO) {
        Visit visit = new Visit();
        visit.setReason(visitDTO.getReason());
        visit.setDateTime(visitDTO.getDateTime());
        visit.setType(visitDTO.getType());
        visit.setHistory(visitDTO.getHistory());
        return visit;
    }
}