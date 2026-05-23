-- Semilla de datos para 10 Vacantes (Job Offers)
INSERT INTO job_offers (title, company, description, salary, schedule, modality, active, embedding, created_at) VALUES 
('Desarrollador Java Junior', 'Tech Solutions', 'Buscamos desarrollador Java con ganas de aprender Spring Boot.', '1500 USD', 'Tiempo Completo', 'Remoto', true, '[0.1, 0.2, 0.3]', NOW()),
('Analista de Datos Jr', 'Data Corp', 'Analista para equipo de inteligencia de negocios.', '1800 USD', 'Medio Tiempo', 'Híbrido', true, '[0.2, 0.1, 0.4]', NOW()),
('Frontend Developer', 'Web Innovations', 'Experiencia en React y CSS moderno.', '2000 USD', 'Tiempo Completo', 'Remoto', true, '[0.3, 0.5, 0.1]', NOW()),
('Backend Developer Med', 'FinTech Latam', 'Java Spring Boot y Microservicios.', '2500 USD', 'Tiempo Completo', 'Presencial', true, '[0.1, 0.2, 0.5]', NOW()),
('Data Scientist', 'AI Start', 'Desarrollo de modelos de ML e IA.', '3000 USD', 'Tiempo Completo', 'Remoto', true, '[0.8, 0.1, 0.2]', NOW()),
('Ingeniero DevOps', 'Cloud Services', 'Automatización de despliegues y CI/CD.', '3500 USD', 'Tiempo Completo', 'Remoto', true, '[0.4, 0.4, 0.4]', NOW()),
('Diseñador UX/UI', 'Creative Agency', 'Diseño de interfaces atractivas.', '1800 USD', 'Medio Tiempo', 'Híbrido', true, '[0.5, 0.6, 0.1]', NOW()),
('Scrum Master', 'Agile Tech', 'Líder ágil para equipos de desarrollo.', '2500 USD', 'Tiempo Completo', 'Remoto', true, '[0.2, 0.3, 0.8]', NOW()),
('QA Tester', 'Quality Assurance', 'Pruebas automatizadas y manuales.', '1500 USD', 'Tiempo Completo', 'Remoto', true, '[0.2, 0.2, 0.2]', NOW()),
('Arquitecto Cloud', 'Enterprise Solutions', 'Diseño de infraestructura en AWS.', '4500 USD', 'Tiempo Completo', 'Remoto', true, '[0.9, 0.8, 0.7]', NOW());
