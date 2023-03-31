# Car Registry

Este proyecto es una aplicación web para registrar y gestionar vehículos. Permite a los usuarios registrarse y autenticarse, y ver una lista de todos los vehículos registrados. Además, los usuarios pueden agregar sus propios vehículos y ver una lista de los vehículos que poseen.

## Tecnologías utilizadas

- HTML
- CSS
- Bootstrap
- Node.js
- PostgreSQL
- API REST
- JSON Web Tokens (JWT)
- Multer


## Instalación

1. Clona el repositorio en tu computadora.
2. Ejecuta el comando `npm install` para instalar todas las dependencias.
3. Crea una base de datos en PostgreSQL y actualiza el archivo `.env` con las siguientes variables:
    - `DB`: base de datos para connection String
    - `SECRETO`: string para la encriptación de JWT
    - `PORT`: puerto para conectarse
4. Ejecuta el comando `npm run start` para iniciar el servidor.
5. Accede a la aplicación en tu navegador web en la dirección `http://localhost:puerto`.

## Estructura del proyecto

La aplicación consta de las siguientes carpetas y archivos principales:

- `app/server.js`: archivo principal que inicia el servidor y configura las rutas de la API.
- `public/`: carpeta que contiene archivos estáticos, como imágenes y estilos CSS.
- `public/views/`: carpeta que contiene archivos de vistas HTML.
- `app/routes/`: carpeta que contiene archivos de rutas para la API.
- `app/controllers/`: carpeta que contiene archivos de controladores para la lógica del negocio.
- `app/db/db.js`: archivo que configura la conexión a la base de datos PostgreSQL.

## Rutas de la API

La aplicación tiene las siguientes rutas de la API:

- `/api/autos`: ruta principal que muestra una lista de todos los vehículos registrados.
- `/api/informacion`: ruta para mostrar la informacion del perfil del usuario autenticado.
- `/form/registro`: ruta para registrar un nuevo usuario.
- `/form/login`: ruta para autenticar a un usuario existente y generar un token JWT.
- `/form/agregarAutos`: ruta para agregar un nuevo vehículo.



