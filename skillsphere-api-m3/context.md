# Contexto de Backend: SkillSphere API (M3) - STATUS & HANDOFF

Este documento es el **punto de entrada obligatorio** para cualquier agente de IA que retome esta sesión. Contiene la arquitectura, tecnologías permitidas, objetivos del Momento 3 y el estado exacto de en qué nos quedamos.

## 📌 Estado Actual y Siguientes Pasos (Para el Próximo Agente)
**ESTADO:** Finalizamos la etapa de planificación y análisis. Tenemos claro el stack y los requisitos. El plan de implementación ha sido propuesto y el contexto general y específico ha sido configurado.
**QUÉ SE DEBE HACER AL INICIAR LA PRÓXIMA SESIÓN:**
1. **Configurar el proyecto base:** Crear o revisar los paquetes `dto`, `model`, `repository`, `service`, `controller` en `src/main/java/com/grupo10/skillsphere`.
2. **Crear las Entidades Base:** Ej: `JobOffer`, `Certificate`, etc. Es importante emplear `@Embeddable` para agrupar campos repetidos y mantener un diseño relacional limpio.
3. **Crear los DTOs:** Crear `RequestDTO` y `ResponseDTO` para cada modelo. Esto es un requisito obligatorio del Momento 3.
4. **Desarrollar Repositorios y Servicios:** Crear las interfaces que extienden `JpaRepository` y los servicios que manejan la lógica y el mapeo Entidad <-> DTO.
5. **Desarrollar los Controladores:** Exponer endpoints REST **CRUD completos** (GET, POST, PUT, DELETE) que reciban y retornen únicamente DTOs.
6. **Configurar Swagger/OpenAPI:** Para que Frontend y Python sepan exactamente cómo consumir la API (Contrato).

## 🛠️ Tecnologías y Arquitectura Base (Dictadas por el Docente)
- **Lenguaje/Framework:** Java, Spring Boot 3.x.
- **Base de Datos:** PostgreSQL (hosteado en Supabase).
- **ORM:** Spring Data JPA + Hibernate.
- **Lombok:** Para reducir boilerplate (`@Data`, `@NoArgsConstructor`, etc.).
- **Arquitectura:** Modelo en capas:
  - `Controller` (recibe/devuelve **DTOs**)
  - `Service` (lógica de negocio)
  - `Repository` (`JpaRepository`)
  - `Entity` (mapeo a BD)
- **Configuración BD:** Variables de entorno en un archivo `.env` (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`) cargadas en `application.properties` usando `spring.config.import=optional:file:.env[.properties]`.

## 🎯 Requisitos Obligatorios del Momento 3
1. **API REST Consumible:** Backend funciona como el *Source of Truth* (Contrato de Datos).
2. **Uso de DTOs:** Obligatorio para separar la capa de base de datos de la de presentación.
3. **Uso de JPA Embeddables:** Agrupar campos reutilizables con `@Embeddable/@Embedded` sin crear tablas separadas.
