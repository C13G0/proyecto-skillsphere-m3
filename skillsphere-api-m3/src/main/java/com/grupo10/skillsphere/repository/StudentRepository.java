package com.grupo10.skillsphere.repository;

import com.grupo10.skillsphere.model.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Spring Data JPA genera automáticamente los métodos CRUD:
    // findAll(), findById(), save(), deleteById(), etc.
}
