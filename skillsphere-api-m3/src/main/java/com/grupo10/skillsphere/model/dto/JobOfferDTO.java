package com.grupo10.skillsphere.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * DTO (Data Transfer Object) para JobOffer.
 * Excluye campos sensibles o internos como 'createdAt' y 'updatedAt'.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class JobOfferDTO {

    private Long id; // ID único de la oferta laboral
    private String title; // Título de la oferta
    private String company; // Empresa oferente
    private String description; // Descripción de la oferta
    private String salary; // Salario ofrecido
    private String schedule; // Horario (e.g., full-time, part-time)
    private String modality; // Modalidad (e.g., remoto, presencial)
    private Boolean active; // Si la oferta está activa

    // Nota: No incluye 'createdAt' ni 'updatedAt' para mantener consistencia con otros DTOs
}