package it.cgm.prp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "visit")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @ApiModelProperty(position = 1)
    private Long id;

    @Column(name = "date_time")
    @ApiModelProperty(position = 2)
    private LocalDateTime dateTime;

    @Enumerated(EnumType.STRING)
    @ApiModelProperty(position = 3)
    private VisitType type;

    @Enumerated(EnumType.STRING)
    @ApiModelProperty(position = 4)
    private VisitReason reason;

    @Column(name = "family_history")
    @ApiModelProperty(position = 5)
    private String history;
}
