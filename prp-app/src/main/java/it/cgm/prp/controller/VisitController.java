package it.cgm.prp.controller;

import io.swagger.annotations.ApiOperation;
import it.cgm.prp.model.Visit;
import it.cgm.prp.model.VisitDTO;
import it.cgm.prp.service.VisitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/visits")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class VisitController {

    private final VisitService visitService;

    @PutMapping("/{id}")
    @ApiOperation(value = "Update a visit with specific id", response = Visit.class)
    public ResponseEntity<?> updateVisit(@PathVariable Long id, @RequestBody VisitDTO visitDTO) {
        try {
            Optional<Visit> optVisit = visitService.getVisitById(id);
            if (optVisit.isPresent()) {
                return new ResponseEntity<>(
                        visitService.updateVisit(optVisit.get(), visitDTO),
                        HttpStatus.OK);
            } else {
                return noVisitFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete Visit with specific id", response = String.class)
    public ResponseEntity<?> deleteVisit(@PathVariable Long id) {
        try {
            Optional<Visit> optVisit = visitService.getVisitById(id);
            if (optVisit.isPresent()) {
                visitService.deleteVisit(optVisit.get());
                return new ResponseEntity<>(String.format("Visit with id: %d was deleted", id), HttpStatus.OK);
            } else {
                return noVisitFoundResponse(id);
            }
        } catch (Exception e) {
            return errorResponse();
        }
    }

    private ResponseEntity<String> errorResponse() {
        return new ResponseEntity<>("Something went wrong :(", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<String> noVisitFoundResponse(Long id) {
        return new ResponseEntity<>("No visit found with id: " + id, HttpStatus.NOT_FOUND);
    }

}
