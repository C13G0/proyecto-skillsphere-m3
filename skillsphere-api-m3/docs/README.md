Aquí tienes el diseño técnico y profesional para el archivo `README.md`. Está redactado en Markdown estándar, listo para que borres el contenido del archivo actual en la raíz de tu proyecto, pegues este bloque completo y lo guardes.

He configurado las rutas de Java de forma que sirvan tanto para ti en la compu del CESDE como para tus compañeros si descargan el proyecto.

```markdown
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

---

### 💡 ¿Qué sigue ahora?
1. Abre tu archivo `README.md` en VS Code.
2. Reemplaza todo el texto viejo por este de arriba.
3. Guarda los cambios (`Ctrl + S`).
4. Haz el flujo de Git que te recomendé en el turno anterior para subir este manual a GitHub (`git add .`, `git commit -m "docs: actualizar readme con instrucciones de arranque y swagger"`, `git push origin main`).

¡Con esto el proyecto queda blindado a nivel documental y técnico! Quedo listo para cuando quieras que empecemos a tirar código para los métodos POST o a revisar los controladores.

```