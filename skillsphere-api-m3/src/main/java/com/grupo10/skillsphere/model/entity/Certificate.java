package com.grupo10.skillsphere.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "certificates")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Integer year; // Reemplaza las fechas complicadas por el año (AAAA)

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "institution_id")
    private Institution institution;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false)),
            @AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at"))
    })
    private AuditInfo auditInfo = new AuditInfo();
}