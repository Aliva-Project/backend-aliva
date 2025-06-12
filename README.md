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

6. Ejecutar los seeders de la base de datos:
```bash
npm run prisma:seed
```

Este comando ejecutará todos los seeders definidos en la carpeta `prisma/seeders/`. Actualmente incluye:
- `systemPromptSeeder.ts`: Datos iniciales para los prompts del sistema
- `seed.ts`: Archivo principal que orquesta la ejecución de todos los seeders

Para agregar nuevos seeders:
1. Crear un nuevo archivo en `prisma/seeders/` (ej: `nuevoSeeder.ts`)
2. Implementar la función de seed
3. Importar y agregar la función en `seed.ts`

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

## Documentación de la API

La documentación completa de la API está disponible a través de Swagger UI. Una vez que el servidor esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:3000/api-docs
```

La documentación incluye:
- Descripción detallada de todos los endpoints
- Esquemas de request/response
- Ejemplos de uso
- Autenticación y autorización
- Códigos de estado y mensajes de error

## API Endpoints

### Autenticación

- POST `/api/auth/register` - Registro de usuario
- POST `/api/auth/login` - Inicio de sesión
- GET `/api/auth/profile` - Obtener perfil del usuario (requiere autenticación)

## Estructura de la Base de Datos

### Entidades Principales

1. **User**
   - Información básica de las usuarias
   - Campos: id, email, password, name, birthDate, location, role
   - Relaciones con todas las entidades principales

2. **HealthSurveyQuestion & HealthSurveyAnswer**
   - Gestión de encuestas de salud
   - Preguntas personalizables con diferentes tipos (opción única, múltiple, texto, escala)
   - Seguimiento de respuestas por usuaria

3. **MedicalControl & MedicalResult**
   - Control de consultas médicas
   - Registro de resultados y estudios
   - Integración con clínicas

4. **EducationalContent & EducationalCategory**
   - Contenido educativo categorizado
   - Soporte para diferentes tipos de contenido (artículos, videos, audio, quizzes)
   - Seguimiento de contenido visto

5. **VirtualAssistantMessage**
   - Historial de conversaciones con el asistente virtual
   - Soporte para mensajes de texto y audio

6. **Clinic**
   - Registro de centros médicos
   - Categorización y localización

7. **GamificationAction & UserPointHistory**
   - Sistema de puntos por acciones
   - Historial de puntos ganados

8. **Reward & UserReward**
   - Catálogo de recompensas
   - Control de canjes y estado de recompensas

### Relaciones Principales

- Usuarias → Controles Médicos
- Usuarias → Resultados Médicos
- Usuarias → Contenido Educativo
- Usuarias → Encuestas de Salud
- Usuarias → Puntos y Recompensas
- Clínicas → Controles Médicos
- Categorías → Contenido Educativo

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

## Modificación de la Estructura de la Base de Datos

### Consideraciones Importantes

1. **Backup de Datos**
   - Siempre realizar un backup completo de la base de datos antes de cualquier modificación
   - Mantener copias de seguridad de los archivos de migración existentes

2. **Documentación**
   - La documentación en `schema.prisma` se perderá al ejecutar `prisma db pull`
   - Mantener un archivo separado con la documentación de las entidades
   - Documentar los cambios en los commits

3. **Migraciones Existentes**
   - No modificar archivos de migración ya aplicados (`migration.sql`)
   - Las migraciones existentes son parte del historial y no deben alterarse
   - Crear nuevas migraciones para cambios adicionales

### Proceso de Modificación en Desarrollo

1. **Crear nueva migración**:
```bash
# Crear backup del schema actual
cp prisma/schema.prisma prisma/schema.prisma.backup

# Modificar el schema.prisma según necesidades

# Generar nueva migración
npm run prisma:migrate -- --name descripcion_del_cambio

# Verificar la migración generada en prisma/migrations
```

2. **Probar los cambios**:
```bash
# Aplicar la migración en desarrollo
npm run prisma:migrate

# Verificar que todo funcione correctamente
npm run dev
```

### Proceso de Actualización en Producción

1. **Preparación**:
```bash
# Backup de la base de datos
mysqldump -u [usuario] -p [nombre_db] > backup_[fecha].sql

# Backup del schema actual
cp prisma/schema.prisma prisma/schema.prisma.backup
```

2. **Aplicar cambios**:
```bash
# Primero aplicar las migraciones en producción
npm run prisma:migrate:deploy

# Luego generar el cliente de Prisma actualizado
npm run prisma:generate
```

3. **Verificación**:
```bash
# Verificar el estado de las migraciones
npm run prisma:migrate:status

# Comprobar la integridad de los datos
```

### Comandos Útiles

```bash
# Ver estado actual de la base de datos
npm run prisma:db:pull

# Generar cliente Prisma
npm run prisma:generate

# Ver historial de migraciones
npm run prisma:migrate:status

# Revertir última migración (solo desarrollo)
npm run prisma:migrate:reset

# Ejecutar seeders
npm run prisma:seed

# Ejecutar seeders y resetear la base de datos (desarrollo)
npm run prisma:migrate:reset && npm run prisma:seed
```

### Buenas Prácticas

1. **Versionado**
   - Mantener un control estricto de versiones
   - Documentar cada cambio en el schema
   - Usar nombres descriptivos para las migraciones

2. **Testing**
   - Probar las migraciones en un ambiente de staging
   - Verificar la integridad de los datos después de cada migración
   - Tener un plan de rollback

3. **Documentación**
   - Mantener actualizada la documentación de las entidades
   - Documentar los cambios en el CHANGELOG
   - Comunicar los cambios al equipo
   