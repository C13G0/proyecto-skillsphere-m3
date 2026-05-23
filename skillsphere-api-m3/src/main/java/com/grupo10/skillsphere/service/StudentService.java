package com.grupo10.skillsphere.service;

import com.grupo10.skillsphere.model.dto.StudentDTO;
import com.grupo10.skillsphere.model.entity.Student;
import com.grupo10.skillsphere.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<StudentDTO> findAll() {
        return repository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public Optional<StudentDTO> findById(Long id) {
        return repository.findById(id).map(this::convertToDTO);
    }

    public StudentDTO save(StudentDTO studentDTO) {
        Student entity = convertToEntity(studentDTO);
        Student saved = repository.save(entity);
        return convertToDTO(saved);
    }

    public StudentDTO update(Long id, StudentDTO studentDetails) {
        return repository.findById(id).map(existing -> {
            existing.setFirstName(studentDetails.getFirstName());
            existing.setLastName(studentDetails.getLastName());
            existing.setEmail(studentDetails.getEmail());
            existing.setPhone(studentDetails.getPhone());
            existing.setBirthDate(studentDetails.getBirthDate());
            existing.setProgram(studentDetails.getProgram());
            Student updated = repository.save(existing);
            return convertToDTO(updated);
        }).orElseThrow(() -> new RuntimeException("Estudiante no encontrado con id: " + id));
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    private StudentDTO convertToDTO(Student entity) {
        StudentDTO dto = new StudentDTO();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setBirthDate(entity.getBirthDate());
        dto.setProgram(entity.getProgram());
        return dto;
    }

    private Student convertToEntity(StudentDTO dto) {
        Student entity = new Student();
        entity.setId(dto.getId());
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setBirthDate(dto.getBirthDate());
        entity.setProgram(dto.getProgram());
        return entity;
    }
}
