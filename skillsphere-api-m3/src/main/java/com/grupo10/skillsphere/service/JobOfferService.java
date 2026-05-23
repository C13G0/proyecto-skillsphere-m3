package com.grupo10.skillsphere.service;

import com.grupo10.skillsphere.model.dto.JobOfferDTO;
import com.grupo10.skillsphere.model.entity.JobOffer;
import com.grupo10.skillsphere.repository.JobOfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobOfferService {

    private final JobOfferRepository repository;

    public JobOfferService(JobOfferRepository repository) {
        this.repository = repository;
    }

    public List<JobOfferDTO> findAll() {
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<JobOfferDTO> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public JobOfferDTO save(JobOfferDTO jobOfferDTO) {
        JobOffer entity = convertToEntity(jobOfferDTO);
        JobOffer saved = repository.save(entity);
        return convertToDTO(saved);
    }

    public JobOfferDTO update(Long id, JobOfferDTO jobOfferDetails) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(jobOfferDetails.getTitle());
            existing.setCompany(jobOfferDetails.getCompany());
            existing.setDescription(jobOfferDetails.getDescription());
            existing.setSalary(jobOfferDetails.getSalary());
            existing.setSchedule(jobOfferDetails.getSchedule());
            existing.setModality(jobOfferDetails.getModality());
            existing.setActive(jobOfferDetails.getActive());
            JobOffer updated = repository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Oferta laboral no encontrada con id: " + id));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    // --- Mappers ---
    private JobOfferDTO convertToDTO(JobOffer entity) {
        JobOfferDTO dto = new JobOfferDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setCompany(entity.getCompany());
        dto.setDescription(entity.getDescription());
        dto.setSalary(entity.getSalary());
        dto.setSchedule(entity.getSchedule());
        dto.setModality(entity.getModality());
        dto.setActive(entity.getActive());
        return dto;
    }

    private JobOffer convertToEntity(JobOfferDTO dto) {
        JobOffer entity = new JobOffer();
        entity.setId(dto.getId());
        entity.setTitle(dto.getTitle());
        entity.setCompany(dto.getCompany());
        entity.setDescription(dto.getDescription());
        entity.setSalary(dto.getSalary());
        entity.setSchedule(dto.getSchedule());
        entity.setModality(dto.getModality());
        entity.setActive(dto.getActive());
        return entity;
    }
}
