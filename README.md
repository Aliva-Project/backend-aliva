# Backend Aliva - Proyecto de Salud Preventiva

Este es el backend para el proyecto de salud preventiva Aliva, desarrollado con Node.js, Express, TypeScript y Prisma.

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Aliva-Project/backend-aliva.git
cd backend-aliva
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
DATABASE_URL="mysql://user:password@localhost:3306/aliva_db"
JWT_SECRET="tu_secreto_jwt_super_seguro"
PORT=3000
```

4. Generar el cliente de Prisma:
```bash
npm run prisma:generate
```

5. Ejecutar las migraciones de la base de datos:
```bash
npm run prisma:migrate
```

## Desarrollo

Para ejecutar el servidor en modo desarrollo:
```bash
npm run dev
```

## Producción

1. Compilar el proyecto:
```bash
npm run build
```

2. Iniciar el servidor:
```bash
npm start
```

## API Endpoints

### Autenticación

- POST `/api/auth/register` - Registro de usuario
- POST `/api/auth/login` - Inicio de sesión
- GET `/api/auth/profile` - Obtener perfil del usuario (requiere autenticación)

## Tecnologías Utilizadas

- Node.js
- Express
- TypeScript
- Prisma (ORM)
- MySQL
- Passport.js (Autenticación)
- JWT (JSON Web Tokens)
- Multer (Manejo de archivos)
- PDF-parse (Procesamiento de PDFs)
- Tesseract.js (OCR)