package it.cgm.prp.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitDTO {

    @ApiModelProperty(position = 1)
    private LocalDateTime dateTime;

    @ApiModelProperty(position = 2)
    private VisitType type;

    @ApiModelProperty(position = 3)
    private VisitReason reason;

    @ApiModelProperty(position = 4)
    private String history;
}
