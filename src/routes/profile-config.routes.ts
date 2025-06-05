import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validate-request';
import {
  createConfig,
  updateConfig,
  deleteConfig,
  getAllConfigs,
  getConfigById
} from '../controllers/profile-config.controller';

const router = Router();

// Middleware to check if user is admin
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};

// All routes require authentication and admin role
router.use(authenticate, isAdmin);

/**
 * @swagger
 * /api/profile-config:
 *   post:
 *     tags:
 *       - Profile Configuration
 *     summary: Create a new profile field configuration
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fieldName
 *               - displayName
 *               - fieldType
 *             properties:
 *               fieldName:
 *                 type: string
 *               displayName:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *               fieldType:
 *                 type: string
 *                 enum: [TEXT, EMAIL, PHONE, DATE, NUMBER]
 *     responses:
 *       201:
 *         description: Configuration created successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Access denied
 */
router.post(
  '/',
  [
    body('fieldName').notEmpty().withMessage('El nombre del campo es requerido'),
    body('displayName').notEmpty().withMessage('El nombre de visualización es requerido'),
    body('fieldType').isIn(['TEXT', 'EMAIL', 'PHONE', 'DATE', 'NUMBER']).withMessage('Tipo de campo inválido')
  ],
  validateRequest,
  createConfig
);

/**
 * @swagger
 * /api/profile-config/{id}:
 *   put:
 *     tags:
 *       - Profile Configuration
 *     summary: Update a profile field configuration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *               fieldType:
 *                 type: string
 *                 enum: [TEXT, EMAIL, PHONE, DATE, NUMBER]
 *     responses:
 *       200:
 *         description: Configuration updated successfully
 *       400:
 *         description: Invalid input data
 *       403:
 *         description: Access denied
 *       404:
 *         description: Configuration not found
 */
router.put(
  '/:id',
  [
    body('fieldType').optional().isIn(['TEXT', 'EMAIL', 'PHONE', 'DATE', 'NUMBER']).withMessage('Tipo de campo inválido')
  ],
  validateRequest,
  updateConfig
);

/**
 * @swagger
 * /api/profile-config/{id}:
 *   delete:
 *     tags:
 *       - Profile Configuration
 *     summary: Delete a profile field configuration
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Configuration deleted successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Configuration not found
 */
router.delete('/:id', deleteConfig);

/**
 * @swagger
 * /api/profile-config:
 *   get:
 *     tags:
 *       - Profile Configuration
 *     summary: Get all profile field configurations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of configurations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fieldName:
 *                     type: string
 *                   displayName:
 *                     type: string
 *                   isRequired:
 *                     type: boolean
 *                   fieldType:
 *                     type: string
 *       403:
 *         description: Access denied
 */
router.get('/', getAllConfigs);

/**
 * @swagger
 * /api/profile-config/{id}:
 *   get:
 *     tags:
 *       - Profile Configuration
 *     summary: Get a profile field configuration by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Configuration details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 fieldName:
 *                   type: string
 *                 displayName:
 *                   type: string
 *                 isRequired:
 *                   type: boolean
 *                 fieldType:
 *                   type: string
 *       403:
 *         description: Access denied
 *       404:
 *         description: Configuration not found
 */
router.get('/:id', getConfigById);

export default router; 