

## 📋 Guía del Día a Día para Levantar el Backend

### Paso 1: Asegurar el entorno (Por si sale el error de Java)

Cada vez que abras una terminal de PowerShell nueva, antes de cualquier otra cosa, ejecuta esta línea para asegurar que Maven encuentre Java 21:

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.10"

POWERSHELL
##If error JAVA HOME
$env:JAVA_HOME
java -version

```

### Paso 2: Encender el Servidor

Asegúrate de estar en la carpeta raíz del proyecto (donde ves el archivo `pom.xml`) y ejecuta el comando directo para correr la aplicación:

```powershell
.\mvnw spring-boot:run

```

---

## 🚀 Siguiente paso: Probar los Métodos POST

Como ya quitamos el candado de Spring Security, ahora la API está completamente abierta. Ya no necesitas configurar autenticación básica (Basic Auth), ni tokens Bearer, ni contraseñas en Postman.

### 🌐 Las URLs de Prueba:

* **Para ver la documentación visual (Swagger):**
Abre tu navegador e ingresa a esta URL para ver todos los controladores creados:
> `http://localhost:8080/swagger-ui.html`


* **Para probar en Postman (Tus Endpoints):**
La base de todas tus rutas en este proyecto inicia con `/api`. Dependiendo de la entidad que quieras probar (estudiantes, ofertas de trabajo, etc.), las URLs exactas para enviar tus peticiones **POST** en Postman son:

| Entidad | URL para el método POST en Postman |
| --- | --- |
| **Estudiantes** | `http://localhost:8080/api/students` |
| **Ofertas de Empleo** | `http://localhost:8080/api/job-offers` |
| **Certificados** | `http://localhost:8080/api/certificates` |
| **Instituciones** | `http://localhost:8080/api/institutions` |

> 💡 **Tip para el POST en Postman:** Recuerda que al hacer un POST debes ir a la pestaña **Body**, seleccionar la opción **raw** y cambiar el tipo a **JSON** para pegar el objeto que vas a guardar en Supabase.