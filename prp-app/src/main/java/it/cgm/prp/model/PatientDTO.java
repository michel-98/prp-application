package it.cgm.prp.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private String name;
    private String surname;
    private Date birthDate;
    private Long ssn;
    private ArrayList<Visit> visits = new ArrayList<>();
}
