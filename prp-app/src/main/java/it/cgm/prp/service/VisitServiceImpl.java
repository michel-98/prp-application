package it.cgm.prp.service;

import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.repository.VisitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService {

    private final VisitRepository visitRepository;

    @Override
    @Transactional
    public Optional<Visit> getVisitById(Long id) {
        return visitRepository.findById(id);
    }

    @Override
    @Transactional
    public Visit updateVisit(Visit oldVisit, VisitDTO newVisitDTO) {
        return visitRepository.save(updateVisitFromDTO(oldVisit, newVisitDTO));
    }

    @Override
    @Transactional
    public void deleteVisit(Visit visit) {
        visitRepository.delete(visit);
    }

    private Visit updateVisitFromDTO(Visit visit, VisitDTO visitDTO) {
        if (Optional.ofNullable(visitDTO.getDateTime()).isPresent()) {
            visit.setDateTime(visitDTO.getDateTime());
        }

        if (Optional.ofNullable((visitDTO.getHistory())).isPresent()) {
            visit.setHistory(visitDTO.getHistory());
        }

        if (Optional.ofNullable((visitDTO.getReason())).isPresent()) {
            visit.setReason(visitDTO.getReason());
        }

        if (Optional.ofNullable((visitDTO.getType())).isPresent()) {
            visit.setType(visitDTO.getType());
        }
        return visit;
    }
}
