package com.grupo10.skillsphere.service;

import com.grupo10.skillsphere.model.dto.CertificateDTO;
import com.grupo10.skillsphere.model.entity.Certificate;
import com.grupo10.skillsphere.repository.CertificateRepository;
import com.grupo10.skillsphere.repository.InstitutionRepository;
import com.grupo10.skillsphere.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CertificateService {

    private final CertificateRepository repository;
    private final StudentRepository studentRepository;
    private final InstitutionRepository institutionRepository;

    public CertificateService(CertificateRepository repository, StudentRepository studentRepository, InstitutionRepository institutionRepository) {
        this.repository = repository;
        this.studentRepository = studentRepository;
        this.institutionRepository = institutionRepository;
    }

    public List<CertificateDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CertificateDTO> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public CertificateDTO save(CertificateDTO certificateDTO) {
        Certificate entity = convertToEntity(certificateDTO);
        Certificate saved = repository.save(entity);
        return convertToDTO(saved);
    }

    public CertificateDTO update(Long id, CertificateDTO certificateDetails) {
        return repository.findById(id).map(existing -> {
            existing.setName(certificateDetails.getName());
            existing.setDescription(certificateDetails.getDescription());
            existing.setIssueDate(certificateDetails.getIssueDate());
            existing.setExpiryDate(certificateDetails.getExpiryDate());
            if (certificateDetails.getStudentId() != null) {
                existing.setStudent(studentRepository.getReferenceById(certificateDetails.getStudentId()));
            }
            if (certificateDetails.getInstitutionId() != null) {
                existing.setInstitution(institutionRepository.getReferenceById(certificateDetails.getInstitutionId()));
            }
            Certificate updated = repository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Certificado no encontrado con id: " + id));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    // --- Mappers ---
    private CertificateDTO convertToDTO(Certificate entity) {
        CertificateDTO dto = new CertificateDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setIssueDate(entity.getIssueDate());
        dto.setExpiryDate(entity.getExpiryDate());
        if (entity.getStudent() != null) {
            dto.setStudentId(entity.getStudent().getId());
        }
        if (entity.getInstitution() != null) {
            dto.setInstitutionId(entity.getInstitution().getId());
        }
        return dto;
    }

    private Certificate convertToEntity(CertificateDTO dto) {
        Certificate entity = new Certificate();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setIssueDate(dto.getIssueDate());
        entity.setExpiryDate(dto.getExpiryDate());
        if (dto.getStudentId() != null) {
            entity.setStudent(studentRepository.getReferenceById(dto.getStudentId()));
        }
        if (dto.getInstitutionId() != null) {
            entity.setInstitution(institutionRepository.getReferenceById(dto.getInstitutionId()));
        }
        return entity;
    }
}
