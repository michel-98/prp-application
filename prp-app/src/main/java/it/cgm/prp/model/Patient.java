package it.cgm.prp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@Table(name = "patient")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id",
        scope = Patient.class)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(position = 1)
    private Long id;

    @Column(name = "name")
    @ApiModelProperty(position = 2)
    private String name;

    @Column(name = "surname")
    @ApiModelProperty(position = 3)
    private String surname;

    @Column(name = "birth_date")
    @ApiModelProperty(position = 4)
    private Date birthDate;

    @Column(name = "social_security_number")
    @ApiModelProperty(position = 5)
    private Long ssn;

    @OneToMany(
            cascade = {CascadeType.ALL},
            fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    @ApiModelProperty(position = 6)
    private List<Visit> visits;

    public void addVisit(Visit visit) {

        if (Objects.isNull(visits)) {
            this.visits = new ArrayList<>();
        }
        this.visits.add(visit);
    }
}
