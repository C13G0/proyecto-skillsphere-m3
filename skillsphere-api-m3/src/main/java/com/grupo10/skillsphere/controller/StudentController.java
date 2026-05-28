package com.grupo10.skillsphere.controller;

import com.grupo10.skillsphere.model.dto.StudentDTO;
import com.grupo10.skillsphere.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173") // <-- Protegemos el acceso desde el ecosistema React
@Tag(name = "Students", description = "API for managing students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    // GET /api/students → Listar todos los estudiantes
    @GetMapping
    @Operation(summary = "Get all students")
    public List<StudentDTO> getAllStudents() {
        return studentService.findAll();
    }

    // GET /api/students/{id} → Buscar estudiante por ID
    @GetMapping("/{id}")
    @Operation(summary = "Get student by ID")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        return studentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/students → Crear un nuevo estudiante
    @PostMapping
    @Operation(summary = "Create a new student")
    public StudentDTO createStudent(@RequestBody StudentDTO student) {
        return studentService.save(student);
    }

    // PUT /api/students/{id} → Actualizar un estudiante
    @PutMapping("/{id}")
    @Operation(summary = "Update a student")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO studentDetails) {
        try {
            StudentDTO updatedStudent = studentService.update(id, studentDetails);
            return ResponseEntity.ok(updatedStudent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/students/{id} → Eliminar un estudiante
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a student")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}