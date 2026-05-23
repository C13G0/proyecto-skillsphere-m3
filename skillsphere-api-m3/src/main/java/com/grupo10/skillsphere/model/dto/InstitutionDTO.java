package com.grupo10.skillsphere.model.dto;

import lombok.Data;

@Data
public class InstitutionDTO {
    private Long id;
    private String name;
    private String country;
    private String website;
    private String type;
}