package com.grupo10.skillsphere.controller;

import com.grupo10.skillsphere.model.dto.InstitutionDTO;
import com.grupo10.skillsphere.service.InstitutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/institutions")
@CrossOrigin(origins = "http://localhost:5173") // <-- Agregamos el permiso de acceso para el Frontend
@Tag(name = "Institutions", description = "API for managing institutions")
public class InstitutionController {

    @Autowired
    private InstitutionService institutionService;

    // GET /api/institutions → Listar todas las instituciones
    @GetMapping
    @Operation(summary = "Get all institutions")
    public List<InstitutionDTO> getAllInstitutions() {
        return institutionService.findAll();
    }

    // GET /api/institutions/{id} → Buscar institución por ID
    @GetMapping("/{id}")
    @Operation(summary = "Get institution by ID")
    public ResponseEntity<InstitutionDTO> getInstitutionById(@PathVariable Long id) {
        return institutionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/institutions → Crear una nueva institución
    @PostMapping
    @Operation(summary = "Create a new institution")
    public InstitutionDTO createInstitution(@RequestBody InstitutionDTO institution) {
        return institutionService.save(institution);
    }

    // PUT /api/institutions/{id} → Actualizar una institución
    @PutMapping("/{id}")
    @Operation(summary = "Update an institution")
    public ResponseEntity<InstitutionDTO> updateInstitution(@PathVariable Long id, @RequestBody InstitutionDTO institutionDetails) {
        try {
            InstitutionDTO updatedInstitution = institutionService.update(id, institutionDetails);
            return ResponseEntity.ok(updatedInstitution);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/institutions/{id} → Eliminar una institución
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an institution")
    public ResponseEntity<Void> deleteInstitution(@PathVariable Long id) {
        institutionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}