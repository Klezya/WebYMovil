# WebYMovil


DECISIONES TECNICAS

1-Auth: El usuario se autentica de forma anonima (evitando utilizar contrasena y correo) solo con su rut, para poder gestionar permisos de rutas mas facilmente (routesGuard en './app/core/auth.guard.ts')

2-Core/layout y Core/popup Componentes centralizados sin ruta que estaran presente en todos los componentes con .html, para visualizar una NavBar y poder gestionar un PopUp personalizado

3-utils Carpeta con utilidades e interfaces de uso comun entre componentes

4-FormControl, se utilizo ReactiveFormsModule y FormControl junto a sus validators, para manejar de manera mas dinamica las validaciones y requisitos de los valores de los formularios tanto de 'log-in' como de 'tramites'

5-Firebase, se utilizo firebase porque skill issue

6-TailwindCSS, se utilizo tailwindCSS en lugar de boostrap, porque gracias a flowbite se tiene un mayor repertorio de interfaces dinamicas (Ma lindo)

7-Componentes Standalo, somo pulento, los componentes tambien y se manejan solos, aguante angular 18

8-SharedService, se creo un servicio compartido para poder mantener los datos ingresados a travez de todos los componentes, incluso al recargar pagina gracias a localStorage

9-Toast, alertas emergentes mas lindas

10-Se utilizo un tema oscuro para la pagina web pa que no duelan los ojitos