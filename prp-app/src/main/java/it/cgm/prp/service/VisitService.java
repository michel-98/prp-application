package it.cgm.prp.service;

import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;

import java.util.Optional;

public interface VisitService {

    Optional<Visit> getVisitById(Long id);

    Visit updateVisit(Visit oldVisit, VisitDTO newVisitDTO);

    void deleteVisit(Visit visit);
}
