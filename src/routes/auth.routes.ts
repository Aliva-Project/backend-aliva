import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getProfile } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate-request';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     security: [] # No requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - birthDate
 *               - location
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: Contraseña del usuario (mínimo 6 caracteres)
 *               name:
 *                 type: string
 *                 description: Nombre completo del usuario
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento en formato ISO 8601 (YYYY-MM-DD)
 *               location:
 *                 type: string
 *                 description: Ubicación del usuario
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario registrado exitosamente
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *       400:
 *         description: Error en los datos proporcionados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: La fecha de nacimiento y la ubicación son requeridas
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al registrar usuario
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('birthDate')
      .isISO8601()
      .withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('location')
      .notEmpty()
      .withMessage('La ubicación es requerida'),
  ],
  validateRequest,
  register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Autenticación]
 *     security: [] # No requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login exitoso
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al iniciar sesión
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  validateRequest,
  login
);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del usuario
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del usuario
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 role:
 *                   type: string
 *                   description: Rol del usuario
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la cuenta
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 */
router.get('/profile', authenticate, getProfile);

export default router; 