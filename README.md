<header>

# Solemne1 - Aplicación para Agendar Citas para Licencia de Conducir

_Solemne1 es una aplicación web diseñada para que los ciudadanos puedan agendar citas presenciales para obtener o renovar su licencia de conducir en Chile, o modificar una cita previamente agendada. ._

</header>

## Instalación

1. **Requisitos**:
   - [Node.js](https://nodejs.org/en/download/package-manager) (versión 20.17 LTS)
   - [Angular](https://angular.dev/installation) (versión 18.2)

2. **Verificar los requisitos**:
   ```bash
   node --version
   ng --version
   npm --version
   ```

3. **Clonar repositorio**
   ```bash
   git clone https://github.com/Klezya/WebYMovil
   ```

4. **Instalar dependencias**:
   ```bash
   cd solemne1
   npm install
   ```

## Despliegue local del proyecto

1. **Ejecuta el servidor de desarrollo**
    ```bash
    ng serve
    ```
    Abre el navegado e ingresa a [http://localhost:4200/](http://localhost:4200/)
    O ingresa a la direccion entregada por tu terminal

## Estructura del proyecto
   ```bash
   solemne1/
    │
    ├── src/
    │   └── app/
    │       ├── auth/                # Maneja la autenticación y login
    │       │   ├── data-access/     # Servicio para la autenticación anónima
    │       │   └── features/        # Componente de login
    │       ├── tramites/            # Maneja los formularios de trámites
    │       │   ├── data-access/     # Servicio para citas en Firebase
    │       │   └── features/        # Componentes para tipos de trámites
    │       ├── core/                # Componentes y servicios compartidos
    │       ├── utils/               # Utilidades y validadores
    │       └── app.routes.ts        # Rutas de la aplicación
    └── package.json                 # Dependencias y scripts del proyecto
   ```

## Decisiones tecnicas

**Firestore** 
Se eligió Firestore como base de datos por su facilidad de uso y capacidad para manejar datos en tiempo real.

**Autenticación Anónima**
La decisión de utilizar la autenticación anónima simplifica el proceso de inicio de sesión en firestore, ya que los usuarios solo necesitan su RUN para acceder al sistema, dandonos la posibilidad de controlar accesos a las rutas no autorizadas.

**Componentes Standalone**
Angular 18 permite utilizar componentes independientes, lo que simplifica la gestión de la aplicación y mejora la reutilización del código.

**Estilos con TailwindCSS** 
La elección de TailwindCSS acompañado de Flowbite permite un diseño más flexible y personalizable en comparación con Bootstrap.

**Servicio Compartido** 
El uso de un servicio compartido permite mantener el estado de la aplicación y la persistencia de los datos en ```localStorage```, facilitando la experiencia del usuario al navegar entre componentes y recargar la aplicacion.

**Validaciones Dinámicas**
Se implementaron formularios reactivos con validaciones para asegurar que los datos ingresados sean correctos.

**Dark Mode**
El proyecto está optimizado con un tema oscuro para una experiencia visual más cómoda.