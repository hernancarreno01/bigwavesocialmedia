# Reglas del Proyecto BigWave

## Control de Versiones y Despliegue (GitHub + Vercel)

Este proyecto está hosteado en Vercel y conectado a un repositorio de GitHub. 

**Instrucción crítica para el Agente (Antigravity):**
Cada vez que se realicen modificaciones o actualizaciones en el código de este proyecto, **es obligatorio** registrar los cambios en Git y hacer push al repositorio de GitHub. Esto es fundamental porque Vercel está configurado para desplegar automáticamente cualquier cambio que ingrese a la rama principal.

### Flujo de trabajo estándar:
1. Realizar los cambios solicitados por el usuario.
2. Comprobar el estado (`git status`).
3. Añadir los cambios (`git add .`).
4. Crear un commit descriptivo (`git commit -m "Descripción clara de los cambios"`).
5. Subir los cambios a GitHub (`git push`).
