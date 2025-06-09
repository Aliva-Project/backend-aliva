import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { configurePassport } from './config/passport';
import swaggerJsdoc from 'swagger-jsdoc';

// Importar rutas y configuraciones
import authRoutes from './routes/auth.routes';
import profileConfigRoutes from './routes/profile-config.routes';
import userProfileRoutes from './routes/user-profile.routes';
import familyHistoryRoutes from './routes/family-history.routes';
import familyHistoryConfigRoutes from './routes/family-history-config.routes';
import controlHistoryRoutes from './routes/control-history.routes';
import relevantHabitRoutes from './routes/relevant-habit.routes';
import virtualAssistantRoutes from './routes/virtualAssistant.routes';

// Configuración de variables de entorno
dotenv.config();

const app = express();

// Configuración de Passport
configurePassport(passport);

// Configuración de Swagger
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
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.ts'], // archivos que contienen las anotaciones de Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar Passport
app.use(passport.initialize());
configurePassport(passport);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/assistant', virtualAssistantRoutes);
app.use('/api/profile-config', profileConfigRoutes);
app.use('/api/profile', userProfileRoutes);
app.use('/api/family-history', familyHistoryRoutes);
app.use('/api/family-history/config', familyHistoryConfigRoutes);
app.use('/api/control-history', controlHistoryRoutes);
app.use('/api/relevant-habit', relevantHabitRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Aliva funcionando correctamente' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 