package com.grupo10.skillsphere.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CertificateDTO {

    private Long id;
    private String name;
    private String description;

    @JsonProperty("year")
    private Integer year; // Recibe directamente el número de 4 dígitos desde Postman

    @JsonProperty("student_id")
    private Long studentId;

    @JsonProperty("institution_id")
    private Long institutionId;
}