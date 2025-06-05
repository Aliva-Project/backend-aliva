import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Aliva',
      version: '1.0.0',
      description: 'API para el sistema de Aliva',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Perfil (Admin)',
        description: 'Endpoints para administradores de configuración de perfil',
      },
      {
        name: 'Perfil (Usuario)',
        description: 'Endpoints para usuarios de perfil',
      },
      {
        name: 'Antecedentes Familiares (Admin)',
        description: 'Endpoints para administradores de antecedentes familiares',
      },
      {
        name: 'Antecedentes Familiares (Usuario)',
        description: 'Endpoints para usuarios de antecedentes familiares',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../docs/*.swagger.ts'),
  ],
};

export const specs = swaggerJsdoc(swaggerOptions); 