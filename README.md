Solemne1 - Sistema de Agendamiento de Citas para Licencia de Conducir
Descripción
Solemne1 es una aplicación web diseñada para que los ciudadanos puedan agendar citas presenciales para obtener o renovar su licencia de conducir en Chile, o modificar una cita previamente agendada. El sistema utiliza autenticación anónima basada en el RUN (Rol Único Nacional) y permite gestionar los horarios disponibles de forma dinámica.

Requisitos
Dependencias principales:
Node.js (v20.17 LTS o superior)
npm (v10.8 o superior)
Angular (v18.2 o superior)
Firebase (Configurado con Firestore)
TailwindCSS (para estilos)
ngx-sonner (para alertas emergentes)
Rut Utilities (para validar el RUN)
Instalación de dependencias
Asegúrate de tener Node.js y npm instalados:

bash
Copiar código
node --version
npm --version
Si no los tienes instalados, descárgalos desde Node.js.

Instalar Angular CLI globalmente:

bash
Copiar código
npm install -g @angular/cli
Dentro de la carpeta raíz del proyecto solemne1, instala las dependencias:

bash
Copiar código
cd solemne1
npm install
Verificación de la instalación
Para verificar que todo esté correctamente instalado:

Revisa que los paquetes necesarios estén instalados:

bash
Copiar código
npm list
Asegúrate de que Angular esté correctamente configurado:

bash
Copiar código
ng --version
Despliegue local del proyecto
Para desplegar la aplicación de forma local:

Ejecuta el servidor de desarrollo:

bash
Copiar código
ng serve
Abre tu navegador y navega a http://localhost:4200/.

Despliegue en producción (Firebase Hosting)
Configura Firebase en tu proyecto. Si no lo tienes configurado:

Dirígete a Firebase Console.
Crea un proyecto.
Habilita Firestore Database.
En la terminal, inicia sesión en Firebase:

bash
Copiar código
firebase login
Configura Firebase Hosting en tu proyecto:

bash
Copiar código
firebase init
Selecciona Hosting y sigue las instrucciones.

Despliega la aplicación:

bash
Copiar código
ng build --prod
firebase deploy
Compatibilidad del proyecto
Ubuntu (Linux)
El proyecto fue desarrollado en Ubuntu 24.04 LTS. Todas las instrucciones anteriores han sido probadas y funcionan correctamente en este entorno.
Windows
Instala Node.js desde Node.js Windows Installer.
Usa la PowerShell o CMD para ejecutar los comandos:
bash
Copiar código
npm install
ng serve
macOS
Instala Node.js a través de Homebrew:

bash
Copiar código
brew install node
Después de la instalación, sigue los mismos pasos:

bash
Copiar código
npm install
ng serve
Aspectos importantes del proyecto
Autenticación Anónima: La aplicación solo requiere el RUN del usuario, evitando la complejidad de gestionar contraseñas.

Uso de Firebase: Todo el sistema de citas está basado en Firestore para manejar datos en tiempo real.

Diseño UI Dinámico: TailwindCSS con Flowbite permite un diseño atractivo y reactivo.

Componentes Standalone en Angular 18: Aprovechamos la nueva característica de componentes standalone para simplificar la arquitectura.

SharedService: Se creó un servicio compartido para mantener los datos persistentes incluso al refrescar la página, aprovechando localStorage.

Dark Mode: El proyecto está optimizado con un tema oscuro para una experiencia visual más cómoda.

Notas adicionales
Este proyecto fue creado y probado en Ubuntu 24.04 LTS, pero debería ser compatible con Windows y macOS sin problemas.
En caso de problemas de compatibilidad, verifica la versión de Node.js y Angular, ya que podrían afectar el despliegue.