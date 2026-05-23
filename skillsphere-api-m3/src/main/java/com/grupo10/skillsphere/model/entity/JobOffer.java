package com.grupo10.skillsphere.model.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "job_offers")
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String company;
    private String description;
    private String salary;
    private String schedule;
    private String modality;
    private Boolean active;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false)),
            @AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at"))
    })
    private AuditInfo auditInfo = new AuditInfo();
}
