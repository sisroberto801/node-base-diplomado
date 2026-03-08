# API REST con Express y Swagger

Proyecto de API REST desarrollado con Node.js, Express, Sequelize y documentación Swagger/OpenAPI 3.0.

## 👤 Datos del Estudiante
- **Nombre:** Roberto Carlos Olguin Ledezma
- **Fecha:** Marzo 2026

## 🚀 Características

- **Autenticación JWT** con Bearer tokens
- **CRUD completo** para Usuarios y Tareas
- **Base de datos** PostgreSQL con Sequelize ORM
- **Documentación automática** con Swagger UI
- **Validación de datos** con Joi
- **Logging** con Pino
- **Middleware** de autenticación
- **Creación masiva** de usuarios

## 📋 Requisitos

- Node.js 18+
- PostgreSQL
- Variables de entorno configuradas

# 📚 Documentación de la API

Accede a la documentación interactiva en:

- **Swagger UI**: http://localhost:3000/api-docs
- **Swagger UI Produccion**: https://roberto-olguin.onrender.com/api-docs/

## 📋 Endpoints

### 🧑‍💻 Usuarios

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Listar usuarios | ❌ |
| POST | `/api/users` | Crear usuario | ❌ |
| POST | `/api/users/bulk` | Crear usuarios masivamente | ❌ |
| GET | `/api/users/{id}` | Obtener usuario | ✅ |
| PUT | `/api/users/{id}` | Actualizar usuario | ✅ |
| PATCH | `/api/users/{id}` | Actualizar estado | ✅ |
| DELETE | `/api/users/{id}` | Eliminar usuario | ✅ |
| GET | `/api/users/{id}/tasks` | Obtener tareas del usuario | ✅ |
| GET | `/api/users/list/pagination` | Listar con paginación | ❌ |

### 🔑 Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/login` | Iniciar sesión y obtener token |

### ✅ Tareas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Listar tareas del usuario | ✅ |
| POST | `/api/tasks` | Crear tarea | ✅ |
| GET | `/api/tasks/{id}` | Obtener tarea | ✅ |
| PUT | `/api/tasks/{id}` | Actualizar tarea | ✅ |
| PATCH | `/api/tasks/{id}` | Marcar como completada | ✅ |
| DELETE | `/api/tasks/{id}` | Eliminar tarea | ✅ |