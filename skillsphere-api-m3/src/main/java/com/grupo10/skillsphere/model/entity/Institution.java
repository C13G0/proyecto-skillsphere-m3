package com.grupo10.skillsphere.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "institutions")
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
    private String website;
    private String type;

    @OneToMany(mappedBy = "institution")
    private List<Certificate> certificates;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "createdAt", column = @Column(name = "created_at", updatable = false)),
            @AttributeOverride(name = "updatedAt", column = @Column(name = "updated_at"))
    })
    private AuditInfo auditInfo = new AuditInfo();
}
