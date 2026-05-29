Aquí tienes tu `README.md` independiente, diseñado única y exclusivamente para el módulo de **Frontend**. Está optimizado para que lo copies y lo pegues directamente en la raíz de tu proyecto de React.

---

# 💻 SkillSphere — Frontend UI

Esta es la interfaz de usuario moderna, interactiva y de alta fidelidad para la plataforma **SkillSphere**. Está construida sobre **React** y actúa como el cliente web nativo que consume de forma asíncrona los servicios de la API REST del backend para la gestión de perfiles estudiantiles, visualización de vacantes de IA y carga de certificaciones.

---

## 🚀 Tecnologías Core

* **Librería Principal:** React (Componentes funcionales y Hooks de estado)
* **Lenguaje:** JavaScript (ES6+) / JSX
* **Estilos:** CSS3 Nativo (Diseño adaptativo, Grid y Flexbox)
* **Persistencia Local:** LocalStorage (Mantenimiento de sesión del estudiante en el navegador)
* **Comunicación de Red:** Fetch API (Peticiones HTTP asíncronas nativas)

---

## 📂 Estructura de Vistas y Flujo Reactivo

La aplicación organiza su experiencia de usuario en torno a componentes clave completamente acoplados a la lógica del negocio:

1. **📝 Formulario de Registro (`/registro`):**
* Captura los datos reales del estudiante (Nombre, Correo, Teléfono, Programa).
* Despacha una petición `POST` al backend y, tras recibir la confirmación, inicializa el estado global guardando la respuesta en el almacenamiento local.


2. **👤 Dashboard de Perfil (`/perfil`):**
* Extrae la información persistida en el `LocalStorage`.
* Renderiza dinámicamente el perfil real del estudiante junto con su ID autogenerado por PostgreSQL.


3. **📜 Módulo de Certificados (`/certificados`):**
* Renderiza un grid dinámico con los logros académicos del usuario.
* Cuenta con un formulario que amarra automáticamente el `student_id` del perfil activo para enviar nuevas inserciones al servidor de forma transparente.


4. **💼 Tablero de Vacantes (`/vacantes`):**
* Consume mediante un `GET` el catálogo completo de ofertas laborales del backend.
* Mapea y renderiza tarjetas visuales (cards) optimizadas para mostrar roles avanzados e innovadores del mundo de la Inteligencia Artificial.



---

## 🔄 Conexión e Integración con el Backend

Por defecto, el cliente React está configurado para conectarse con el servidor local de desarrollo mediante la URL base:

> **`http://localhost:8080`**

### ⚡ Gestión de Estados Asíncronos

* **Banderas de Carga (`isLoading`):** El cliente maneja estados booleanos para pintar interfaces de espera visuales mientras el backend procesa los flujos de datos.
* **Control de Excepciones Relacionales:** La interfaz está adaptada para interceptar códigos de error del servidor (como respuestas `400/500`). Si intentas guardar un certificado apuntando a una institución inexistente, el frontend captura el fallo para evitar el congelamiento de la aplicación.

---

## 🛠️ Ciclo de Ejecución Local

Para levantar la interfaz en tu entorno de desarrollo, asegúrate de tener instalado **Node.js** y ejecuta los siguientes comandos en la raíz de la carpeta del frontend:

1. **Instalar el árbol de dependencias de Node:**
```bash
npm install

```


2. **Iniciar el servidor local de desarrollo:**
```bash
npm run dev
# Si tu arquitectura utiliza Create React App:
npm start

```


3. **Acceso al navegador:**
Abre tu navegador en la dirección provista por la consola (comúnmente `http://localhost:5173` o `http://localhost:3000`).

---

## 💡 Consejo de Oro para Pruebas

Si realizas purgas o truncas tablas directamente desde la base de datos PostgreSQL, las estructuras guardadas en tu navegador quedarán obsoletas. Si experimentas comportamientos inesperados o valores en `null`, limpia el almacenamiento local abriendo la consola de desarrollador del navegador (**F12 -> Pestaña "Application" -> Local Storage -> Clear**) y recarga la página para iniciar un flujo de pruebas limpio.