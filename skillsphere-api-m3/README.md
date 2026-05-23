# SkillSphere - API de Gestión de Certificados y Oportunidades Laborales

## 📌 Estado Actual del Proyecto (Mayo 2026)

**Versión**: 0.0.1-SNAPSHOT  
**Estado**: ✅ Funcional en desarrollo con H2  
**Base de Datos Actual**: H2 (en memoria, para desarrollo)  
**Base de Datos Destino**: Supabase (PostgreSQL en la nube)  

> **IMPORTANTE**: Estamos usando **H2 para desarrollo local** porque permite desarrollar sin dependencias externas. Pronto migraremos a **Supabase** para ambiente de producción.

---

## 🎯 Descripción del Proyecto

SkillSphere es una API REST desarrollada en **Spring Boot 3.5.11 con Java 21** que permite gestionar:
- 📚 **Certificados**: Credenciales académicas de estudiantes
- 👨‍💼 **Estudiantes**: Información de usuarios del sistema
- 🏢 **Instituciones**: Universidades y centros de formación
- 💼 **Ofertas Laborales**: Vacantes y oportunidades de empleo

Cada recurso soporta operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) y está documentado automáticamente con **Swagger/OpenAPI**.

### Características Principales
- ✅ API REST con documentación automática (Swagger UI)
- ✅ H2 Database para desarrollo local (sin instalación requerida)
- ✅ Arquitectura lista para Supabase (PostgreSQL)
- ✅ DTOs para respuestas limpias y estructuradas
- ✅ Uso de JPA/Hibernate con `@Embeddable`
- ✅ Diseño relacional coherente para el backend
- ✅ Dos perfiles: `dev` (H2) y `prod` (Supabase)

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener:

1. **Java 21+** (OpenJDK o Eclipse Temurin)
   - Verificar: `java -version`
   - Descargar desde: https://adoptium.net/

2. **Maven 3.8+** (incluido en el proyecto con `mvnw.cmd`)
   - No necesitas instalarlo, está integrado

3. **PowerShell o CMD** (para ejecutar en Windows)

---

## 🚀 Pasos para Ejecutar el Proyecto

### PASO 1️⃣: Compilar el Proyecto

```bash
cd "c:\Users\CESDE BELLO\Music\M3\backend-skillsphere-m3\skillsphere-api-m3"
.\mvnw.cmd clean package -DskipTests -q
```

**¿Qué hace?**
- `clean`: Elimina compilaciones anteriores
- `package`: Compila y crea el JAR ejecutable
- `-DskipTests`: Salta pruebas (opcional, agiliza)
- `-q`: Modo silencioso (menos logs)

**Esperado**: Termina sin errores después de ~60 segundos

---

### PASO 2️⃣: Ejecutar la Aplicación (Desarrollo con H2)

**Opción A: Con JAR compilado** (⭐ Recomendado)
```bash
cd "c:\Users\CESDE BELLO\Music\M3\backend-skillsphere-m3\skillsphere-api-m3"
java -jar target\skillsphere-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev
```

**Opción B: Con Maven directamente**
```bash
cd "c:\Users\CESDE BELLO\Music\M3\backend-skillsphere-m3\skillsphere-api-m3"
.\mvnw.cmd spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

**¿Qué significa `--spring.profiles.active=dev`?**
- Activa el perfil `dev`
- Carga `application-dev.properties` (H2 en memoria)
- ✅ Útil para desarrollo sin dependencias externas
- No requiere Supabase

**Esperado**: Verás esto al final:
```
2026-05-09T10:32:34.752-05:00  INFO ... o.s.b.a.h2.H2ConsoleAutoConfiguration    : H2 console available at '/h2-console'
2026-05-09T10:32:34.773-05:00  INFO ... c.g.skillsphere.SkillSphereApplication   : Started SkillSphereApplication in X seconds
```

✅ **La API está lista en `http://localhost:8080`**

---

### PASO 3️⃣: Probar la API

Abre una **NUEVA terminal** (sin cerrar la anterior) y ejecuta:

#### 3.1 - Ver si la API responde (sin datos):
```bash
curl http://localhost:8080/api/certificates
curl http://localhost:8080/api/students
curl http://localhost:8080/api/institutions
curl http://localhost:8080/api/job-offers
```

Deberías recibir: `[]` (array vacío)

#### 3.2 - Crear datos de prueba (POST):
```bash
# Crear una institución
curl -X POST http://localhost:8080/api/institutions ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Universidad CESDE\",\"country\":\"Colombia\",\"website\":\"https://cesde.edu.co\",\"type\":\"University\"}"

# Crear un estudiante
curl -X POST http://localhost:8080/api/students ^
  -H "Content-Type: application/json" ^
  -d "{\"firstName\":\"Juan\",\"lastName\":\"Perez\",\"email\":\"juan@cesde.edu.co\",\"phone\":\"3001234567\",\"birthDate\":\"1995-05-15\",\"program\":\"Ingeniería\"}"

# Crear un certificado
curl -X POST http://localhost:8080/api/certificates ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Certificado Java\",\"description\":\"Certificación Java Avanzado\",\"issueDate\":\"2023-01-15\",\"expiryDate\":\"2026-01-15\",\"studentId\":1,\"institutionId\":1}"

# Crear una oferta laboral
curl -X POST http://localhost:8080/api/job-offers ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Desarrollador Java\",\"company\":\"Tech Solutions\",\"description\":\"Buscamos dev Java Sr\",\"salary\":\"$4.000.000\",\"schedule\":\"Full-time\",\"modality\":\"Remoto\",\"active\":true}"
```

#### 3.3 - Ver todos los datos creados (GET):
```bash
curl http://localhost:8080/api/institutions
curl http://localhost:8080/api/students
curl http://localhost:8080/api/certificates
curl http://localhost:8080/api/job-offers
```

Ahora deberías ver todos los datos que creaste en formato JSON.

#### 3.4 - Opción gráfica: Swagger UI (Recomendado)
Abre en tu navegador: **`http://localhost:8080/swagger-ui.html`**

Aquí puedes:
- Ver todos los endpoints
- Probarlos con una interfaz visual
- Ver documentación automática

#### 3.5 - Ver la base de datos H2 (Opcional)
Abre en tu navegador: **`http://localhost:8080/h2-console`**

- JDBC URL: `jdbc:h2:mem:testdb`
- User: `sa`
- Password: (dejar en blanco)
- Click en "Connect"

---

## 🚀 Pasos para Inicializar el Proyecto

### 1️⃣ **Clonar o Descargar el Repositorio**

Si aún no tienes el proyecto:

```bash
# Opción A: Clonar desde Git
git clone <URL-del-repositorio>
cd skillsphere

# Opción B: Si solo descargaste el ZIP
unzip skillsphere.zip
cd skillsphere
```

### 2️⃣ **Configurar las Variables de Entorno** (Para cuando uses Supabase)

#### Crear archivo `.env` en la raíz del proyecto:

```bash
# En Windows (CMD):
copy .env.example .env

# En Windows (PowerShell):
Copy-Item .env.example .env

# En macOS/Linux:
cp .env.example .env
```

#### Para DESARROLLO CON H2: `.env` puede estar vacío o comentado

#### Para PRODUCCIÓN CON SUPABASE: Reemplazar placeholders:

```properties
# Variables de conexión a Supabase
DB_URL=jdbc:postgresql://db.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-api-key-publico
```

**¿Cómo obtener estas credenciales?**

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto (o crea uno nuevo)
3. Ve a **Settings** > **API**
4. Copia:
   - **Project URL** → `SUPABASE_URL` (ejemplo: `https://ubafnnnjgedgueilqihx.supabase.co`)
   - **Service Role Key** o **Public Key** → `SUPABASE_KEY`

> ⚠️ **IMPORTANTE**: 
> - Nunca compartas tu `.env` en público ni lo commits a Git
> - Está excluido en `.gitignore` automáticamente
> - Cada PC debe tener su propio `.env` con sus credenciales

---

## � Endpoints Disponibles

| Recurso | GET | POST | PUT | DELETE |
|---------|-----|------|-----|--------|
| `/api/institutions` | ✅ | ✅ | ✅ | ✅ |
| `/api/students` | ✅ | ✅ | ✅ | ✅ |
| `/api/certificates` | ✅ | ✅ | ✅ | ✅ |
| `/api/job-offers` | ✅ | ✅ | ✅ | ✅ |

Ejemplo GET por ID:
```bash
curl http://localhost:8080/api/certificates/1
```

---

## 📚 Acceder a la API

### 1. **Documentación Interactiva (Swagger UI)**
```
http://localhost:8080/swagger-ui.html
```
Aquí puedes ver todos los endpoints y probarlos directamente desde el navegador.

### 2. **JSON de OpenAPI (para Postman)**
```
http://localhost:8080/v3/api-docs
```

**Para importar en Postman:**
1. Abre Postman
2. **File** > **Import**
3. Selecciona **Link** y pega: `http://localhost:8080/v3/api-docs`
4. ¡Automáticamente importará todos los endpoints!

## 🔐 Configuración de Entornos: `.env` y `application.properties`

### ¿Por qué tenemos dos `application.properties`?

```
src/main/resources/
├── application.properties       # Configuración por DEFECTO (Supabase)
└── application-dev.properties   # Configuración DEV (H2)
```

| Archivo | Perfil | BD Usada | Cuándo |
|---------|--------|----------|--------|
| `application.properties` | (ninguno) | PostgreSQL (Supabase) | Producción |
| `application-dev.properties` | `dev` | H2 (en memoria) | Desarrollo local |

### Spring Profiles: ¿Cómo funciona?

```
1. Ejecutas: java -jar ... --spring.profiles.active=dev
                                      ↓
2. Spring carga: application.properties (base)
                 application-dev.properties (sobrescribe)
                                      ↓
3. Usa: H2 Database (jdbc:h2:mem:testdb)
```

Sin `--spring.profiles.active=dev` → Intenta cargar Supabase (necesita .env)

### Archivo `.env` - Variables de Entorno

**Ubicación**: `skillsphere-api-m3\.env`

**Para DESARROLLO (H2)**: Puede estar vacío o comentado
```properties
# No necesita credenciales para H2
```

**Para PRODUCCIÓN (Supabase)**:
```properties
# Variables de conexión a Supabase (PostgreSQL)
DB_URL=jdbc:postgresql://db.supabase.co:5432/postgres?sslmode=require
DB_USERNAME=postgres
DB_PASSWORD=tu_password_supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-api-key-publico
```

**¿Por qué el `.env`?**
- Spring carga variables con: `${DB_URL:}` en properties
- No exponemos credenciales en el código
- Está en `.gitignore`, no se commitea
- Cada PC puede tener sus propias credenciales

---

## � JPA Embeddables: Arquitectura Relacional

### ¿Qué es un Embeddable?

Un `@Embeddable` en Jakarta Persistence es una clase que agrupa campos relacionados y se embebe dentro de una entidad principal. No crea una tabla separada; sus columnas se almacenan directamente en la tabla de la entidad que lo usa.

### Embeddables en SkillSphere

Creamos un embeddable `AuditInfo` para capturar la auditoría de las entidades:
- `createdAt`
- `updatedAt`

Esto se usa en:
- `Student`
- `JobOffer`
- `Institution`
- `Certificate`

### Ventajas
- 📦 Reduce campos repetidos en las entidades
- 🔧 Centraliza el diseño de auditoría
- ✅ Mantiene un modelo relacional limpio
- ✅ Funciona en H2 y PostgreSQL sin dependencias externas

### Estado Actual
- ✅ `AuditInfo` existe como `@Embeddable`
- ✅ Todas las entidades principales usan `@Embedded AuditInfo`
- ✅ No hay dependencias de pgvector ni IA de embeddings en el backend
- ✅ El proyecto está alineado con el patrón JPA correcto

---

## ¿Por qué H2 ahora y Supabase después?

| Aspecto | H2 | Supabase |
|--------|-------|----------|
| **Instalación** | ✅ Incluida | ❌ Requiere cuenta |
| **Datos persistentes** | ❌ Se pierden al reiniciar | ✅ Permanentes |
| **Acceso remoto** | ❌ Solo localhost | ✅ Desde cualquier IP |
| **JPA / SQL** | ✅ Soporta | ✅ Soporta |
| **Ideal para** | 💻 Desarrollo local | 🚀 Producción |

**Estrategia**:
1. **Hoy**: Desarrollo con H2 (rápido, sin dependencias)
2. **Mañana**: Pruebas con Supabase (datos reales)
3. **Producción**: Supabase PostgreSQL con JPA y `AuditInfo`

---

## 🐛 Solución de Problemas

### ❌ "El término 'mvnw' no se reconoce"
**Solución**: Usa `.\mvnw.cmd` en Windows (con `.\`)
```bash
# ❌ MALO
mvnw clean package

# ✅ BUENO
.\mvnw.cmd clean package
```

### ❌ "Port 8080 already in use"
**Solución**: Mata los procesos Java
```bash
taskkill /f /im java.exe
```
O ejecuta en otro puerto:
```bash
java -jar ... --server.port=8081
```

### ❌ "Failed to delete JAR: El proceso no tiene acceso"
**Solución**: La aplicación anterior sigue corriendo
```bash
taskkill /f /im java.exe
# Luego recompila
.\mvnw.cmd clean package -DskipTests -q
```

### ❌ "Java version not found"
**Solución**: Verifica que tienes Java 21+
```bash
java -version
# Descarga desde: https://adoptium.net/
```

### ❌ "Supabase connection failed" (cuando migres)
- Verifica `.env` tiene valores correctos
- Comprueba conexión a internet
- Asegúrate que tu proyecto Supabase está activo

---

## � Estructura del Proyecto

```
skillsphere-api-m3/
├── src/main/java/com/grupo10/skillsphere/
│   ├── SkillSphereApplication.java       # Clase principal
│   ├── config/
│   │   └── OpenApiConfig.java            # Configuración Swagger
│   ├── controller/                        # REST Controllers
│   │   ├── CertificateController.java
│   │   ├── StudentController.java
│   │   ├── InstitutionController.java
│   │   └── JobOfferController.java
│   ├── service/                           # Lógica de negocio
│   │   ├── CertificateService.java
│   │   ├── StudentService.java
│   │   ├── InstitutionService.java
│   │   └── JobOfferService.java
│   ├── model/
│   │   ├── entity/                       # Entidades JPA
│   │   │   ├── Certificate.java          # ← Con `@Embedded AuditInfo`
│   │   │   ├── Student.java              # ← Con `@Embedded AuditInfo`
│   │   │   ├── Institution.java          # ← Con `@Embedded AuditInfo`
│   │   │   └── JobOffer.java             # ← Con `@Embedded AuditInfo`
│   │   └── dto/                          # DTOs para API
│   │       ├── CertificateDTO.java
│   │       ├── StudentDTO.java
│   │       ├── InstitutionDTO.java
│   │       └── JobOfferDTO.java
│   └── repository/                       # JPA Repositories
│       ├── CertificateRepository.java
│       ├── StudentRepository.java
│       ├── InstitutionRepository.java
│       └── JobOfferRepository.java
│
├── src/main/resources/
│   ├── application.properties             # Config por defecto (Supabase)
│   ├── application-dev.properties         # Config dev (H2)
│   └── db/seed/                          # Datos iniciales
│
├── .env                                  # Variables de entorno (NO commitear)
├── .env.example                          # Plantilla de .env
├── pom.xml                               # Dependencias Maven
├── mvnw.cmd                              # Maven Wrapper (Windows)
└── README.md                             # Este archivo
```

---

## 📚 Tecnologías y Versiones

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Java | 21 | Lenguaje de programación |
| Spring Boot | 3.5.11 | Framework REST |
| Spring Data JPA | 3.5.11 | ORM (Object-Relational Mapping) |
| H2 Database | 2.3.x | BD en memoria (desarrollo) |
| PostgreSQL | (Supabase) | BD en nube (producción) |
| Hibernate | 6.6.x | JPA Implementation |
| Lombok | 1.18.x | Reduce boilerplate |
| Springdoc OpenAPI | 2.6.0 | Documentación automática |
| Maven | 3.8+ | Gestor de dependencias |

---

## 📝 Notas de Desarrollo

### Commits Recomendados
```bash
git add .
git commit -m "Initial commit: SkillSphere API con H2 en desarrollo"
```

### Próximas Mejoras
- [ ] Implementar autenticación (JWT)
- [ ] Agregar validaciones en DTOs
- [ ] Consolidar el uso de `@Embeddable` para auditoría y bloques reutilizables
- [ ] Mejorar validaciones de datos y mapeo DTO/Entidad
- [ ] Tests unitarios e integración
- [ ] Migración a Supabase (PostgreSQL)
- [ ] Docker containerización

---

## ⚡ Quick Start (Resumido)

```bash
# 1. Compilar
cd skillsphere-api-m3
.\mvnw.cmd clean package -DskipTests -q

# 2. Ejecutar
java -jar target\skillsphere-0.0.1-SNAPSHOT.jar --spring.profiles.active=dev

# 3. En otra terminal: Probar
curl http://localhost:8080/api/students

# 4. Ver UI interactiva
# Abre: http://localhost:8080/swagger-ui.html
```

---

## 📖 Referencias Útiles

- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **Spring Data JPA**: https://spring.io/projects/spring-data-jpa
- **Supabase Docs**: https://supabase.com/docs
- **OpenAPI/Swagger**: https://swagger.io/specification/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **PostgreSQL**: https://www.postgresql.org/docs/

---

## 👨‍💻 Equipo SkillSphere

Contacto: skillsphere@grupo10.com

---

**Última actualización**: Mayo 9, 2026  
**Estado**: ✅ Funcional con H2 (Desarrollo)  
**Próximo Milestone**: Migración a Supabase (PostgreSQL)

---

¡Listo! 🚀
