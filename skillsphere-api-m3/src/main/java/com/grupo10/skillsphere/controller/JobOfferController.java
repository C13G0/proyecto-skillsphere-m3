package com.grupo10.skillsphere.controller;

import com.grupo10.skillsphere.model.dto.JobOfferDTO;
import com.grupo10.skillsphere.service.JobOfferService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar ofertas laborales.
 * Proporciona endpoints para consultar y crear ofertas usando DTOs para estructura estándar.
 */
@RestController
@RequestMapping("/api/job-offers")
@CrossOrigin(origins = "http://localhost:5173") // <-- Habilita el acceso seguro desde React
@Tag(name = "Job Offers", description = "Endpoints para gestión de ofertas laborales")
public class JobOfferController {

    @Autowired
    private JobOfferService jobOfferService;

    // GET /api/job-offers → Listar todas las ofertas laborales
    @GetMapping
    @Operation(summary = "Obtener todas las ofertas laborales", description = "Devuelve una lista de ofertas en formato DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente")
    })
    public List<JobOfferDTO> getAllJobOffers() {
        return jobOfferService.findAll();
    }

    // GET /api/job-offers/{id} → Buscar oferta laboral por ID
    @GetMapping("/{id}")
    @Operation(summary = "Obtener oferta laboral por ID", description = "Devuelve una oferta específica en formato DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Oferta encontrada"),
            @ApiResponse(responseCode = "404", description = "Oferta no encontrada")
    })
    public ResponseEntity<JobOfferDTO> getJobOfferById(@PathVariable Long id) {
        return jobOfferService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/job-offers → Crear una nueva oferta laboral
    @PostMapping
    @Operation(summary = "Crear una nueva oferta laboral", description = "Crea una oferta a partir de un DTO y devuelve la creada")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Oferta creada exitosamente")
    })
    public ResponseEntity<JobOfferDTO> createJobOffer(@RequestBody JobOfferDTO jobOfferDTO) {
        JobOfferDTO saved = jobOfferService.save(jobOfferDTO);
        return ResponseEntity.ok(saved);
    }

    // PUT /api/job-offers/{id} → Actualizar una oferta laboral
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar oferta laboral", description = "Actualiza una oferta existente con datos de DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Oferta actualizada"),
            @ApiResponse(responseCode = "404", description = "Oferta no encontrada")
    })
    public ResponseEntity<JobOfferDTO> updateJobOffer(@PathVariable Long id, @RequestBody JobOfferDTO jobOfferDetails) {
        try {
            JobOfferDTO updated = jobOfferService.update(id, jobOfferDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/job-offers/{id} → Eliminar una oferta laboral
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar oferta laboral", description = "Elimina una oferta por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Oferta eliminada"),
            @ApiResponse(responseCode = "404", description = "Oferta no encontrada")
    })
    public ResponseEntity<Void> deleteJobOffer(@PathVariable Long id) {
        jobOfferService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}