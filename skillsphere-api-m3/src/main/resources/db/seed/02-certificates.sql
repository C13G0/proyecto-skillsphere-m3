-- Semilla de datos para 10 Certificados del usuario "momen totres"

-- Primero creamos al usuario estudiante para poder referenciarlo
INSERT INTO students (id, first_name, last_name, email, phone, birth_date, program, embedding, created_at)
VALUES (1001, 'momen', 'totres', 'momentotres@test.com', '+1234567890', '2000-01-01', 'Desarrollo de Software', '[0.1, 0.1, 0.1]', NOW())
ON CONFLICT DO NOTHING;

-- Insertamos los certificados asociados a este usuario (student_id = 1001)
INSERT INTO certificates (name, description, issue_date, expiry_date, student_id, embedding, created_at) VALUES 
('Certificación en Java Básico', 'Fundamentos de programación en Java', '2023-01-15', '2028-01-15', 1001, '[0.1, 0.2, 0.3]', NOW()),
('Spring Boot Avanzado', 'Creación de APIs REST y JPA', '2023-06-20', '2026-06-20', 1001, '[0.2, 0.3, 0.4]', NOW()),
('React Developer', 'Construcción de interfaces con React', '2023-11-10', '2026-11-10', 1001, '[0.3, 0.4, 0.5]', NOW()),
('Python para Análisis de Datos', 'Uso de Pandas y Numpy', '2024-02-05', '2027-02-05', 1001, '[0.4, 0.5, 0.6]', NOW()),
('Inglés B2', 'Competencia profesional intermedia', '2022-05-12', '2027-05-12', 1001, '[0.5, 0.6, 0.7]', NOW()),
('Scrum Fundamentos', 'Metodologías ágiles y gestión de proyectos', '2023-08-30', '2028-08-30', 1001, '[0.6, 0.7, 0.8]', NOW()),
('Bases de Datos PostgreSQL', 'Diseño y optimización de consultas', '2024-01-18', '2029-01-18', 1001, '[0.7, 0.8, 0.9]', NOW()),
('Diplomado IA Generativa', 'Uso de LLMs y RAG', '2024-04-10', '2026-04-10', 1001, '[0.8, 0.9, 0.1]', NOW()),
('Arquitectura de Software', 'Patrones de diseño y microservicios', '2023-09-25', '2028-09-25', 1001, '[0.9, 0.1, 0.2]', NOW()),
('Git y GitHub Professional', 'Control de versiones y CI/CD', '2022-12-01', '2027-12-01', 1001, '[0.1, 0.3, 0.5]', NOW());
