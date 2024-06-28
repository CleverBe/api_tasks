# REST API about Tasks

Api que permite guardar tareas por usuario utilizando Json Web Tokens

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas API](#rutas-api)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto localmente.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/CleverBe/api_tasks.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd api_tasks
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno:
   Crea un archivo `.env` en el directorio raíz del proyecto y agrega las siguientes variables:

   ```plaintext
   PORT=

   POSTGRES_HOST=
   POSTGRES_PORT=
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DB=
   DATABASE_URL=

   JWT_SECRET=
   ```

## Uso

Para iniciar el servidor:

```bash
npm run dev
```

## Rutas API

```
POST /api/auth/register
body:
{
  "username": "string",
  "password": "string"
}

POST /api/auth/login
body:
{
  "username": "string",
  "password": "string"
}
```

```
GET /api/tasks

POST /api/tasks
body:
{
   "title":"string"
}

GET /api/tasks/:id

PUT /api/tasks/:id
body:
{
   "title":"string",
   "done":"boolean"
}

PATCH /api/tasks/:id
body:
{
   "done":"boolean"
}

DELETE /api/tasks/:id

```

```
GET /api/users

POST /api/users
body:
{
  "username": "string",
  "password": "string"
}

GET /api/users/:id

PUT /api/users/:id
body:
{
  "username": "string",
  "password": "string",
  "status":"ACTIVE | INACTIVE"
}

DELETE /api/users/:id

GET /api/users/:id/tasks

```
