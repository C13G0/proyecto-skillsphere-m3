# 🏢 SkillSphere - Backend REST API

Ecosistema backend desarrollado en **Java con Spring Boot 3.x** y **Spring Data JPA**, diseñado para la gestión integral de estudiantes, certificados académicos, instituciones y ofertas laborales (vacantes) para la plataforma **SkillSphere**.

## 🚀 Tecnologías Utilizadas
* **Java 17** (o superior).
* **Spring Boot 3.x** (Spring Web, Spring Data JPA).
* **PostgreSQL** (Motor de base de datos relacional robusto).
* **Maven** (Gestor de automatización y ciclo de vida del proyecto).
* **Hibernate** (Implementación de JPA para el Mapeo Objeto-Relacional - ORM).

## 🛠️ Arquitectura del Proyecto
El backend implementa una arquitectura limpia estructurada en capas para aislar responsabilidades, permitiendo un desacoplamiento óptimo:

* `controller/` ── Expone los endpoints de la API REST, gestiona el enrutamiento HTTP y las respuestas del servidor (`@RestController`).
* `service/` ── Alberga la lógica de negocio core del sistema, las validaciones y coordina las transacciones.
* `repository/` ── Capa de persistencia de datos que extiende de `JpaRepository` para la ejecución automática de queries sobre PostgreSQL.
* `model/` o `entity/` ── Representa el mapeo directo de las entidades de Java hacia las tablas físicas relacionales (`Student`, `Certificate`, `Vacancy`, `Institution`).
* `dto/` ── Clases del Objeto de Transferencia de Datos (`StudentDTO`, `CertificateDTO`) utilizadas para recibir payloads limpios desde el frontend y blindar las entidades nativas.

## ⚙️ Configuración del Entorno (`application.properties`)
Configura las credenciales y propiedades de tu entorno local en el archivo `src/main/resources/application.properties` antes de inicializar la aplicación:


```

```text
Archivos generados exitosamente.

```properties
# Configuración del servidor local
server.port=8080

# Conexión a la base de datos PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/skillsphere_db
spring.datasource.username=tu_usuario_postgres
spring.datasource.password=tu_contrasena_postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Configuración e inicialización de Hibernate / JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

```

## 🔀 Endpoints Principales de la API (Estructuras JSON)

Todos los payloads de intercambio se consumen y producen bajo la cabecera `Content-Type: application/json`.

### 1. Gestión de Estudiantes (`/api/students`)

* **`POST /api/students`** (o `/api/auth/register`): Registra un nuevo perfil de estudiante.
* **`GET /api/students/{id}`**: Retorna los detalles demográficos y académicos del estudiante.

### 2. Gestión de Certificados (`/api/certificates`)

* **`POST /api/certificates`**: Registra un nuevo logro académico amarrado estrictamente a un `student_id` y un `institution_id`.
* **`GET /api/certificates`**: Devuelve el histórico de certificados cargados en la plataforma.

### 3. Gestión de Instituciones (`/api/institutions`)

* **`POST /api/institutions`**: Agrega entidades académicas válidas para resolver restricciones de integridad relacional (`Foreign Key`).

### 4. Gestión de Vacantes (`/api/vacancies`)

* **`GET /api/vacancies`**: Lista todo el abanico de ofertas laborales vigentes en tiempo real.
* **`POST /api/vacancies`**: Permite a los reclutadores inyectar nuevas ofertas del mercado (especialmente perfiles avanzados de IA).

## 🏃‍♂️ Cómo Ejecutar el Backend Localmente

1. Levanta tu contenedor Docker o tu servicio nativo de **PostgreSQL**.
2. Asegúrate de tener creada la base de datos especificada en la URL (`skillsphere_db`).
3. Abre una consola de comandos en la carpeta raíz del backend y compila el empaquetado:
```bash
mvn clean install

```


4. Ejecuta el servidor de Spring Boot:
```bash
mvn spring-boot:run

```


5. Valida que el servidor responda correctamente ingresando a: `http://localhost:8080`
"""

readme_frontend_content = """# 💻 SkillSphere - Frontend UI

Interfaz de usuario moderna, interactiva y de alta fidelidad desarrollada sobre **React**. Actúa como la capa de presentación nativa para la plataforma de gestión de talento y certificaciones **SkillSphere**, consumiendo flujos asíncronos de datos desde el backend en Spring Boot.

## 🚀 Tecnologías Utilizadas

* **React** (Componentes funcionales desacoplados y Hooks de estado).
* **JavaScript (ES6+)** / JSX.
* **CSS3 nativo** (Uso de layouts adaptativos para los tableros de control y grids de ofertas).
* **LocalStorage** (Gestión de estado persistente local para mantener la sesión activa del estudiante).
* **Fetch API** (Motor asíncrono nativo para la comunicación de red con endpoints REST).

## 🛠️ Vistas Críticas e Integración de Código

La arquitectura del cliente React se orquesta en torno a cuatro secciones clave alineadas con el DTO unificado:

1. **Formulario de Registro (`/registro`)**
* Captura de forma limpia los campos del estudiante empleando estados reactivos sincronizados.
* Envía las peticiones mediante verbos `POST` convirtiendo los datos a JSON, guardando automáticamente el objeto resultante en el almacenamiento del navegador.


2. **Dashboard de Perfil (`/perfil`)**
* Recupera de forma segura los datos del estudiante del `LocalStorage`.
* Pinta en tiempo real la información real que retornó la base de datos (por ejemplo, el ID autogenerado, nombre, apellido y programa de estudio).


3. **Módulo de Certificados (`/certificados`)**
* Carga de forma dinámica la lista de diplomas vinculados al perfil del usuario.
* Cuenta con validaciones estrictas para enviar el payload amarrando dinámicamente el `student_id` actual.


4. **Grid de Vacantes (`/vacantes`)**
* Consume de forma fluida el catálogo de ofertas del backend.
* Renderiza dinámicamente las tarjetas (cards) visuales de empleos del ecosistema tecnológico e IA.



## 🔄 Flujo de Sincronización y Manejo de Errores

* **Comunicación Cruzada:** Todas las peticiones apuntan a la URL del backend (`http://localhost:8080`).
* **Integridad Referencial:** El cliente está adaptado para procesar respuestas de error del servidor de base de datos (como la violación de claves foráneas `500/400` al insertar certificados con IDs de instituciones inexistentes), informando visualmente al usuario o bloqueando envíos corruptos.
* **Estados de Espera:** Cuenta con banderas booleanas que manejan estados visuales de "Cargando..." mientras se resuelven las peticiones HTTP asíncronas de fondo.

## 🏃‍♂️ Cómo Ejecutar el Frontend Localmente

1. Abre tu terminal favorita en el directorio raíz del proyecto frontend.
2. Descarga e instala las dependencias de node especificadas en el archivo `package.json`:
```bash
npm install

```


3. Inicializa el servidor web local de desarrollo:
```bash
npm run dev
# O en arquitecturas basadas en Create React App:
npm start

```


4. Navega en tu explorador hacia la dirección local indicada por la consola, típicamente `http://localhost:5173` o `http://localhost:3000`.

## 💡 Recomendación Importante de Desarrollo

Si alteras la estructura de datos en tu base de datos PostgreSQL, borras registros manualmente en las tablas o necesitas intercambiar de estudiante de pruebas, recuerda limpiar el almacenamiento del explorador presionando **F12 -> Pestaña "Application" (Aplicación) -> Local Storage -> Clear** para evitar colisiones entre objetos antiguos y las nuevas estructuras del backend.


