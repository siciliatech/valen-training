# Valen Training - API con Docker & Prisma

Este proyecto consiste en una API desarrollada con **Node.js**, **Express**, **TypeScript**, **Prisma** y **MySQL 8.0**. La arquitectura está diseñada para correr íntegramente en contenedores de Docker, asegurando la persistencia de los datos mediante volúmenes.

## 🚀 Requisitos previos
* Docker y Docker Compose instalados.
* Node.js (opcional, para ejecutar comandos de Prisma localmente).

## 🛠️ Configuración e Instalación

1. **Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`. Debe contener los siguientes valores para la conexión interna de Docker:
   ```env
   DATABASE_URL="mysql://user:password@db:3306/database_prisma"
   DATABASE_HOST="db"
   DATABASE_PORT="3306"
   DATABASE_USER="user"
   DATABASE_PASSWORD="password"
   DATABASE_NAME="database_prisma"
   ```
2. **Levantar el sistema**:
    Construye las imágenes y levanta los servicios en segundo plano:
   ```
   docker-compose up -d --build
   ```
4. **Sincronización de Base de Datos (Condicional)**:
    Solo debes ejecutar este comando si es la primera vez que levantas el proyecto o si has borrado los volúmenes de Docker. No es necesario ejecutarlo si ya tienes datos persistidos.
   ```
   $env:DATABASE_URL="mysql://user:password@localhost:3307/database_prisma"; npx prisma db push
   ```
📋 Uso de la API
Base URL: http://localhost:3000.
GET /api/items: Lista todos los elementos cargados en la base de datos.
POST /api/items: Crea un nuevo registro en la base de datos. (Postman)

💡 Detalles de Implementación
Autenticación MySQL 8: Se utiliza mysql_native_password y la opción allowPublicKeyRetrieval: true en el adaptador para permitir la conexión inicial mediante RSA.

Persistencia: Los datos se almacenan en el volumen mysql_data, por lo que se mantienen aunque los contenedores se detengan o se reinicie la PC.

Seguridad: El archivo .env está excluido de la imagen de Docker mediante el archivo .dockerignore
