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
   Crear un archivo `.env` con las variables listadas en el archivo `.env.example`:

   ```bash
   cp .env.example .env
   ```

5. Crear la base de datos con Docker (opcional)

   ```bash
   docker compose up -d
   ```

6. Crear las tablas en la base de datos
   ```bash
   npx prisma db push
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
   "name":"string"
}

GET /api/tasks/:id

PUT /api/tasks/:id
body:
{
   "name":"string",
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
}

PATCH /api/users/:id
body:
{
   "status":"boolean"
}

DELETE /api/users/:id

GET /api/users/:id/tasks

```
