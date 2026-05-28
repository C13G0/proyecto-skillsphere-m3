package com.grupo10.skillsphere.controller;

import com.grupo10.skillsphere.model.dto.CertificateDTO;
import com.grupo10.skillsphere.service.CertificateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar certificados.
 * Proporciona endpoints para consultar y crear certificados usando DTOs para estructura estándar.
 */
@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:5173") // <-- Habilita el acceso seguro desde React
@Tag(name = "Certificates", description = "Endpoints para gestión de certificados")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    // GET /api/certificates → Listar todos los certificados
    @GetMapping
    @Operation(summary = "Obtener todos los certificados", description = "Devuelve una lista de certificados en formato DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista obtenida exitosamente")
    })
    public List<CertificateDTO> getAllCertificates() {
        return certificateService.findAll();
    }

    // GET /api/certificates/{id} → Buscar certificado por ID
    @GetMapping("/{id}")
    @Operation(summary = "Obtener certificado por ID", description = "Devuelve un certificado específico en formato DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Certificado encontrado"),
            @ApiResponse(responseCode = "404", description = "Certificado no encontrado")
    })
    public ResponseEntity<CertificateDTO> getCertificateById(@PathVariable Long id) {
        return certificateService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/certificates → Crear un nuevo certificado
    @PostMapping
    @Operation(summary = "Crear un nuevo certificado", description = "Crea un certificado a partir de un DTO y devuelve el creado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Certificado creado exitosamente")
    })
    public ResponseEntity<CertificateDTO> createCertificate(@RequestBody CertificateDTO certificateDTO) {
        CertificateDTO saved = certificateService.save(certificateDTO);
        return ResponseEntity.ok(saved);
    }

    // PUT /api/certificates/{id} → Actualizar un certificado
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar certificado", description = "Actualiza un certificado existente con datos de DTO")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Certificado actualizado"),
            @ApiResponse(responseCode = "404", description = "Certificado no encontrado")
    })
    public ResponseEntity<CertificateDTO> updateCertificate(@PathVariable Long id, @RequestBody CertificateDTO certificateDetails) {
        try {
            CertificateDTO updated = certificateService.update(id, certificateDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/certificates/{id} → Eliminar un certificado
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar certificado", description = "Elimina un certificado por ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Certificado eliminado"),
            @ApiResponse(responseCode = "404", description = "Certificado no encontrado")
    })
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        certificateService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}