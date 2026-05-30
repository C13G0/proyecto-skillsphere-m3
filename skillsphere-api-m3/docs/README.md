
# 🚀 SkillSphere API - Backend (M3)

API REST robusta desarrollada con **Spring Boot 3** para la plataforma **SkillSphere**, diseñada para conectar de forma eficiente a estudiantes con ofertas de empleo, certificados e instituciones asociadas. 

Esta versión representa la **línea base oficial del proyecto**, configurada con una arquitectura abierta sin restricciones de Spring Security para facilitar las pruebas académicas y la integración directa con la base de datos en la nube (**Supabase**).

---

## 📌 Requisitos Previos

* **Java Development Kit (JDK):** Versión 21 (Específicamente optimizado para `jdk-21.0.10`).
* **Gestor de Dependencias:** Maven (Incluido a través del *wrapper* `mvnw`).
* **Base de Datos:** Instancia activa en Supabase (PostgreSQL).

---

## 🛠️ Configuración del Entorno y Arranque

### 1. Solución al error de `JAVA_HOME`
En entornos académicos o terminales nuevas de Windows, es común que Maven no detecte la ruta correcta de Java. Antes de compilar, ejecuta el siguiente comando en tu terminal de **PowerShell** para forzar el uso de Java 21:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"

```

### 2. Variables de Entorno

Asegúrate de tener un archivo `.env` en la raíz del proyecto con las credenciales de conexión a la base de datos de Supabase. *(Este archivo está protegido por `.gitignore` y nunca debe subirse al repositorio público).*

### 3. Ejecución del Servidor

Para levantar la aplicación en modo desarrollo, utiliza el ejecutable local de Maven:

```powershell
.\mvnw spring-boot:run

```

El servidor web se desplegará localmente en el puerto estándar: `http://localhost:8080`.

---

## 🔌 Documentación y Pruebas de Endpoints

### 📑 Swagger UI (Pruebas en Navegador)

La API cuenta con documentación interactiva autogenerada. Una vez que el servidor esté corriendo, puedes acceder a la interfaz gráfica para mapear y probar todos los controladores directamente desde el navegador:

👉 **[Acceder a Swagger UI de SkillSphere](http://localhost:8080/swagger-ui.html)**

### 🚀 Endpoints Principales para Postman

Todas las rutas base del sistema responden bajo el prefijo `/api`. Al realizar peticiones de tipo **POST**, asegúrate de configurar el cuerpo (*Body*) en formato **RAW JSON**.

| Entidad | Método | URL del Endpoint |
| --- | --- | --- |
| **Estudiantes** | `POST` / `GET` | `http://localhost:8080/api/students` |
| **Ofertas de Empleo** | `POST` / `GET` | `http://localhost:8080/api/job-offers` |
| **Certificados** | `POST` / `GET` | `http://localhost:8080/api/certificates` |
| **Instituciones** | `POST` / `GET` | `http://localhost:8080/api/institutions` |

*Nota: Al haber removido las capas de Spring Security, no se requiere ningún tipo de autenticación (Auth) ni tokens Bearer en Postman para interactuar con estos recursos.*

---

## 👥 Buenas Prácticas y Políticas de GitFlow

Para garantizar la estabilidad de este backend y evitar conflictos de código entre los integrantes del equipo, adoptamos las siguientes reglas estrictas de desarrollo:

1. **La rama `main` es sagrada:** Queda estrictamente prohibido programar o realizar `git push` directamente sobre la rama `main`. Esta rama solo almacena código que compila perfectamente (`BUILD SUCCESS`).
2. **Uso de ramas de características (*Feature Branches*):** Cada nuevo endpoint, corrección de errores o funcionalidad debe trabajarse en una rama independiente creada a partir de `main`.
```powershell
git checkout -b feature/nombre-del-cambio

```


3. **Validación Cruzada:** Antes de fusionar (*merge*) una rama de característica hacia `main`, el desarrollador debe asegurar que el proyecto compila localmente y que las pruebas en Postman/Swagger no rompen la comunicación con Supabase.

```

---```python
backend_readme_content = """# ⚙️ SkillSphere — Backend REST API

Este es el núcleo del ecosistema **SkillSphere**, una API REST robusta desarrollada en **Java 17** con **Spring Boot 3.x** y **Spring Data JPA**. Se encarga de centralizar las reglas de negocio, gestionar la persistencia en una base de datos relacional **PostgreSQL** y asegurar la integridad de los datos para la administración de estudiantes, certificados académicos, instituciones y ofertas laborales de Inteligencia Artificial.

---

## 🚀 Tecnologías Core
* **Lenguaje:** Java 17
* **Framework Principal:** Spring Boot 3.x (Spring Web, Spring Data JPA)
* **Gestor de Dependencias:** Maven
* **Motor de Base de Datos:** PostgreSQL 15+
* **Mapeo Objeto-Relacional (ORM):** Hibernate 6.x

---

## 📂 Arquitectura del Proyecto (Capas)

El backend sigue un patrón de diseño arquitectónico desacoplado por capas limpias, aislando responsabilidades:


```

```text
README independiente de backend creado.

```text
📂 src/main/java/com/grupo10/skillsphere/
├── 📂 controller   --> Exposición de Endpoints REST (@RestController) y manejo de peticiones HTTP.
├── 📂 service      --> Lógica de negocio core, validaciones y orquestación transaccional.
├── 📂 repository   --> Abstracción de persistencia extendiendo de JpaRepository (Spring Data).
├── 📂 model        --> Entidades nativas mapeadas a tablas físicas de PostgreSQL mediante anotaciones JPA.
└── 📂 dto          --> Data Transfer Objects para el intercambio seguro y limpio de payloads con el Frontend.

```

---

## ⚙️ Configuración del Servidor y Base de Datos

Antes de compilar la aplicación, debes estructurar los parámetros de conexión locales en tu archivo `src/main/resources/application.properties`:

```properties
# Puerto del Servidor Backend
server.port=8080

# Conexión a la Base de Datos PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/skillsphere_db
spring.datasource.username=tu_usuario_postgres
spring.datasource.password=tu_contrasena_postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuración Estratégica de JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

```

---

## 🔀 Contratos y Endpoints de la API REST

Todas las transferencias de datos se realizan en formato **JSON** bajo la cabecera `Content-Type: application/json`.

### 1. Módulo de Estudiantes (`/api/students`)

* **`POST /api/students`** (o ruta de registro auth): Registra un nuevo perfil de estudiante.
```json
{
  "firstName": "Andres",
  "lastName": "Rios Arbelaez",
  "email": "andres@skillsphere.com",
  "phone": "+573001234567",
  "program": "Desarrollador de Software"
}

```


* **`GET /api/students/{id}`**: Extrae la información detallada de un perfil real guardado.

### 2. Módulo de Instituciones (`/api/institutions`)

* **`POST /api/institutions`**: Crea entidades académicas que actúan como emisoras válidas de certificados.
```json
{
  "name": "SkillSphere Academy",
  "country": "Colombia",
  "type": "Virtual",
  "website": "[https://skillsphere.com](https://skillsphere.com)"
}

```



### 3. Módulo de Certificados (`/api/certificates`)

* **`POST /api/certificates`**: Guarda un logro académico en la base de datos.
> ⚠️ **Restricción Crítica:** Arrojará `DataIntegrityViolationException` (Error de Llave Foránea) si `student_id` o `institution_id` no existen previamente en sus respectivas tablas.


```json
{
  "name": "Backend Developer Especializado",
  "description": "Especialización completa en APIs REST con Spring Boot y JPA",
  "year": 2026,
  "student_id": 1,
  "institution_id": 1
}

```



### 4. Módulo de Vacantes / Ofertas de IA (`/api/vacancies`)

* **`GET /api/vacancies`**: Retorna el pool completo de ofertas de empleo dinámicas.
* **`POST /api/vacancies`**: Inyecta nuevas ofertas exóticas al mercado laboral.
```json
{
  "title": "AI Red Teamer / Hacker Ético de LLMs",
  "description": "Ataque creativo a modelos mediante inyección de prompts y jailbreaks.",
  "requirements": "Experiencia con LLM Guardrails y scripting avanzado en Python.",
  "company": "CyberShield AI Labs",
  "salary": 8500000
}

```



---

## 🛠️ Ciclo de Ejecución Local

Para levantar el backend de manera limpia en tu entorno local, ejecuta los siguientes comandos en la raíz de la carpeta del backend:

1. **Compilar y construir el proyecto empaquetando dependencias:**
```bash
mvn clean install

```


2. **Iniciar la aplicación Spring Boot:**
```bash
mvn spring-boot:run

```



El servidor quedará escuchando peticiones activamente en: `http://localhost:8080`

