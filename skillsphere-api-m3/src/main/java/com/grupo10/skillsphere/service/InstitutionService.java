package com.grupo10.skillsphere.service;

import com.grupo10.skillsphere.model.dto.InstitutionDTO;
import com.grupo10.skillsphere.model.entity.Institution;
import com.grupo10.skillsphere.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    public List<InstitutionDTO> findAll() {
        return repository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<InstitutionDTO> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public InstitutionDTO save(InstitutionDTO institutionDTO) {
        Institution entity = convertToEntity(institutionDTO);
        Institution saved = repository.save(entity);
        return convertToDTO(saved);
    }

    public InstitutionDTO update(Long id, InstitutionDTO institutionDetails) {
        return repository.findById(id).map(existing -> {
            existing.setName(institutionDetails.getName());
            existing.setCountry(institutionDetails.getCountry());
            existing.setWebsite(institutionDetails.getWebsite());
            existing.setType(institutionDetails.getType());
            Institution updated = repository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Institución no encontrada con id: " + id));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private InstitutionDTO convertToDTO(Institution entity) {
        InstitutionDTO dto = new InstitutionDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCountry(entity.getCountry());
        dto.setWebsite(entity.getWebsite());
        dto.setType(entity.getType());
        return dto;
    }

    private Institution convertToEntity(InstitutionDTO dto) {
        Institution entity = new Institution();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCountry(dto.getCountry());
        entity.setWebsite(dto.getWebsite());
        entity.setType(dto.getType());
        return entity;
    }
}
