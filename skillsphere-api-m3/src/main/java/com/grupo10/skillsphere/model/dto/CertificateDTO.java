package com.grupo10.skillsphere.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

/**
 * DTO (Data Transfer Object) para Certificate.
 * Excluye campos sensibles o internos como 'createdAt' para respuestas de API.
 * Se usa en endpoints GET y POST para estructurar datos de manera estándar.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CertificateDTO {

    private Long id; // ID único del certificado
    private String name; // Nombre del certificado
    private String description; // Descripción del certificado

    @JsonProperty("issue_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate issueDate; // Fecha de emisión

    @JsonProperty("expiry_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expiryDate; // Fecha de expiración

    @JsonProperty("student_id")
    private Long studentId; // ID del estudiante (relación, no la entidad completa)

    @JsonProperty("institution_id")
    private Long institutionId; // ID de la institución (relación, no la entidad completa)

    // Nota: No incluye 'createdAt' ni relaciones completas para mantener la estructura simple y estándar
}