import swaggerJsdoc from 'swagger-jsdoc';
import { authSchemas } from '../schemas/auth.schema';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Aliva',
      version: '1.0.0',
      description: 'Documentación de la API de Aliva',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT en el formato: Bearer <token>'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        ...authSchemas
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [
    './src/routes/*.ts'
  ],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions); 