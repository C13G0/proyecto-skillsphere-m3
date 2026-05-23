# SkillSphere - Contexto Técnico y Plan (Mayo 2026)

## 📌 Estado Actual del Proyecto

**Fecha**: Mayo 9, 2026  
**Versión**: 0.0.1-SNAPSHOT  
**Etapa**: Desarrollo Local (H2) ✅ | Preparado para Supabase 🚀

### Objetivo Principal

Desarrollar una **API REST funcional y consumible** por:
- 📱 **Frontend (React)**: Debe consumir endpoints de `/api/*`
- 🐍 **Backend Python**: Debe hacer requests a la API para obtener datos
- ⚙️ **Microservicios**: Arquitectura escalable y modular

**Requisitos Cumplidos**:
- ✅ API REST con operaciones CRUD
- ✅ DTOs (Data Transfer Objects) en todas las entidades
- ✅ JPA embeddables preparados (`AuditInfo`)
- ✅ Documentación automática (Swagger/OpenAPI)
- ✅ Arquitectura en capas (Controller → Service → Repository → Entity)

## 🏗️ Estructura del Workspace Actual

```
c:\Users\CESDE BELLO\Music\M3\backend-skillsphere-m3\
├── skillsphere-api-m3/          # ✅ Backend Java/Spring Boot
│   ├── src/main/java/
│   ├── src/main/resources/
│   │   ├── application.properties       # Config producción (Supabase)
│   │   └── application-dev.properties   # Config desarrollo (H2)
│   ├── pom.xml
│   ├── .env                             # Variables de entorno (NO COMMITEAR)
│   ├── .gitignore
│   └── README.md                        # Documentación actualizada
│
├── skillsphere_react/           # 📱 Frontend React
├── skillsphere_py/              # 🐍 Python & Análisis
├── context.md                   # Este archivo (actualizado)
└── git_commands.ps1
```

---

## 🚀 Guía de Ejecución Rápida

### Compilar
```bash
cd skillsphere-api-m3
.\mvnw.cmd clean package -DskipTests -q
```

### Ejecutar (Desarrollo con H2)
```bash
java -jar target\skillsphere-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

### Probar la API
```bash
# En nueva terminal
curl http://localhost:8080/api/certificates
curl http://localhost:8080/swagger-ui.html  # En navegador
```

**Detalles completos**: Ver [README.md](skillsphere-api-m3/README.md)

---

## 📋 Entidades Principales y DTOs

### Recursos de la API

| Entidad | Endpoint | CRUD | DTO | Auditoría |
|---------|----------|------|-----|-----------|
| Certificado | `/api/certificates` | ✅ | CertificateDTO | AuditInfo |
| Estudiante | `/api/students` | ✅ | StudentDTO | AuditInfo |
| Institución | `/api/institutions` | ✅ | InstitutionDTO | AuditInfo |
| Oferta Laboral | `/api/job-offers` | ✅ | JobOfferDTO | AuditInfo |

### Ejemplo de Respuesta (JSON)

```json
GET /api/certificates/1

{
  "id": 1,
  "name": "Certificado en Java",
  "description": "Certificación Java Avanzado",
  "issueDate": "2023-01-15",
  "expiryDate": "2026-01-15",
  "studentId": 1,
  "institutionId": 1
}
```

---

## 🔐 Configuración de Bases de Datos

### Desarrollo: H2 (En Memoria)

**Archivo**: `src/main/resources/application-dev.properties`

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=

# Reinicia BD cada vez que se ejecuta
spring.jpa.hibernate.ddl-auto=create-drop

# Console: http://localhost:8080/h2-console
spring.h2.console.enabled=true
```

**Ventajas**:
- ✅ No requiere instalación
- ✅ Rápido para desarrollo local
- ✅ No contamina datos reales

**Desventajas**:
- ❌ Datos se pierden al reiniciar
- ❌ No es persistente entre ejecuciones

### Producción: Supabase (PostgreSQL)

**Archivo**: `src/main/resources/application.properties`

```properties
spring.datasource.url=${DB_URL:}
spring.datasource.username=${DB_USERNAME:}
spring.datasource.password=${DB_PASSWORD:}
spring.datasource.driver-class-name=org.postgresql.Driver

# Actualiza esquema sin reiniciar BD
spring.jpa.hibernate.ddl-auto=update
```

**Variables en `.env`**:

```properties
DB_URL=jdbc:postgresql://db.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_supabase
```

**Ventajas**:
- ✅ Datos persistentes
- ✅ Accesible desde cualquier IP
- ✅ Compatible con JPA relacional y `@Embeddable`
- ✅ Backups automáticos

---

## 🧠 JPA Embeddables: Auditoría Reutilizable

### ¿Qué es?

Un `@Embeddable` en Jakarta Persistence agrupa campos relacionados dentro de una entidad principal sin crear una tabla separada. Se aplica con `@Embedded` en la entidad principal y sus columnas se almacenan en la misma tabla.

### En Nuestro Código

Creamos un embeddable `AuditInfo` con:
- `createdAt`
- `updatedAt`

Y lo usamos en:
- `Student`
- `JobOffer`
- `Institution`
- `Certificate`

### Estado Actual
- ✅ `AuditInfo` existe como `@Embeddable`
- ✅ Todas las entidades principales usan `@Embedded AuditInfo`
- ✅ No hay dependencias de pgvector ni IA de embeddings en el backend
- ✅ El sistema está alineado con el patrón JPA correcto

---

## 🔄 Flujo de Datos: Crear un Certificado

```
┌─────────────────────────────────────────────────┐
│ CLIENT (Postman, React, Python)                 │
│ POST /api/certificates                          │
│ Body: {"name": "Java", ...}                     │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ CertificateController                           │
│ @PostMapping + @RequestBody CertificateDTO      │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ CertificateService.save(DTO)                    │
│ - Convierte DTO → Entity                        │
│ - Valida datos (futuro)                         │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ CertificateRepository.save(Entity)              │
│ (Spring Data JPA)                               │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Hibernate + SQL                                 │
│ INSERT INTO certificates (...)                  │
│ VALUES (...)                                    │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Base de Datos (H2 o Supabase)                  │
│ ✅ Datos almacenados                            │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ Service: Entity → DTO                           │
│ JSON Response                                   │
└────────────────────┬────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│ HTTP 200 OK                                     │
│ {"id": 1, "name": "Java", ...}                 │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Plan de Integración: Frontend + Backend

### Para React

```javascript
// Consumir datos de la API
fetch('http://localhost:8080/api/job-offers')
  .then(res => res.json())
  .then(jobs => {
    // jobs = array de JobOfferDTO
    setJobOffers(jobs);
  });
```

**Props esperadas en componentes**:
```javascript
<JobOfferCard
  id={job.id}
  title={job.title}
  company={job.company}
  salary={job.salary}
  modality={job.modality}
  active={job.active}
/>
```

### Para Python

```python
import requests
import pandas as pd

# Obtener datos de la API
response = requests.get('http://localhost:8080/api/job-offers')
jobs = response.json()

# Convertir a DataFrame
df = pd.DataFrame(jobs)

# Análisis
print(df.describe())
print(df[df['salary'].notna()].groupby('company').size())
```

---

## 🚀 Roadmap: H2 → Supabase

### Hoy (✅ Completado)
- ✅ API REST funcional
- ✅ H2 para desarrollo local
- ✅ DTOs completos
- ✅ JPA embeddables preparados
- ✅ Swagger activo

### Próxima Semana (🚀)
- [ ] Configurar credenciales Supabase
- [ ] Cambiar perfil a producción
- [ ] Probar endpoints con PostgreSQL
- [ ] Migrar datos de H2 → Supabase

### Próximo Mes (🤖)
- [ ] Integrar autenticación (JWT)
- [ ] Tests unitarios e integración
- [ ] Documentar el modelo de auditoría con `AuditInfo`

---

## 🐛 Solución de Problemas Comunes

### El archivo está en uso (Failed to delete JAR)
```bash
taskkill /f /im java.exe
# Luego recompila
```

### `mvnw` no se reconoce
```bash
# ❌ Incorrecto: mvnw
# ✅ Correcto: .\mvnw.cmd
.\mvnw.cmd clean package -DskipTests -q
```

### Puerto 8080 ocupado
```bash
taskkill /f /im java.exe
# O cambia el puerto
java -jar ... --server.port=8081
```

### .env no se carga
- ✅ Archivo existe en: `skillsphere-api-m3\.env`
- ✅ Sin espacios alrededor de `=`
- ✅ Reinicia la app después de cambios

---

## 📚 Documentación Completa

- **README.md**: [Guía completa de ejecución](skillsphere-api-m3/README.md)
- **Swagger UI**: http://localhost:8080/swagger-ui.html (cuando esté corriendo)
- **API Docs**: http://localhost:8080/v3/api-docs

---

## 👥 Tecnologías Usadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Java | 21 | Lenguaje principal |
| Spring Boot | 3.5.11 | Framework REST |
| Spring Data JPA | 3.5.11 | ORM |
| H2 Database | 2.3.x | BD desarrollo |
| PostgreSQL | (Supabase) | BD producción |
| Hibernate | 6.6.x | JPA impl |
| Lombok | 1.18.x | Less boilerplate |
| Springdoc OpenAPI | 2.6.0 | Swagger auto |
| Maven | 3.8+ | Build tool |

---

## ✅ Resumen: Qué Funciona Hoy

- ✅ API REST completa (CRUD)
- ✅ Compilación y ejecución
- ✅ Pruebas con curl/Swagger
- ✅ Documentación actualizada
- ✅ DTOs en todas las entidades
- ✅ JPA embeddables preparados
- ✅ Dos perfiles (dev + prod)
- ✅ Variables de entorno seguras

---

## 📌 Próximo Paso

Cuando estés listo para usar **Supabase**:

1. Crea cuenta en https://app.supabase.com
2. Obtén credenciales (DB_URL, DB_USERNAME, DB_PASSWORD)
3. Actualiza `.env` con esos valores
4. Ejecuta sin `--spring.profiles.active=dev`
5. Spring cargará Supabase automáticamente

---

**Última actualización**: Mayo 9, 2026  
**Mantenedor**: Grupo 10 - SkillSphere  
**Estado**: 🟢 Funcional (H2) | 🟡 Supabase en standby
