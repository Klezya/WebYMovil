<header>

# Solemne1 - Aplicación para Agendar Citas para Licencia de Conducir

_Solemne1 es una aplicación web diseñada para que los ciudadanos puedan agendar citas presenciales para obtener o renovar su licencia de conducir en Chile, o modificar una cita previamente agendada. ._

</header>

## Instalación

1. **Requisitos**:
   - [Node.js](https://nodejs.org/en/download/package-manager)) (versión 20.17 LTS)
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
    │       └── app-routing.module.ts # Rutas de la aplicación
    └── package.json                  # Dependencias y scripts del proyecto
    ```

## Decisiones tecnicas

