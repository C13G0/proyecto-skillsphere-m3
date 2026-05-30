package com.grupo10.skillsphere.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;

    @Column(nullable = false)
    private String phone;
    private String program;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false)),
            @AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at"))
    })
    private AuditInfo auditInfo = new AuditInfo();
}