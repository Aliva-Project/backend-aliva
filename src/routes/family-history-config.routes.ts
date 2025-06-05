import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { validateRequest } from '../middleware/validate-request';
import { FamilyHistoryController } from '../controllers/family-history.controller';

const router = Router();
const familyHistoryController = new FamilyHistoryController();

// All routes require authentication and admin role
router.use(authenticate, isAdmin);

/**
 * @swagger
 * /api/family-history/config/questions:
 *   post:
 *     tags:
 *       - Antecedentes Familiares (Admin)
 *     summary: Crear una nueva pregunta
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answerType
 *             properties:
 *               question:
 *                 type: string
 *               description:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *               answerType:
 *                 type: string
 *                 enum: [TEXT, SELECT, MULTIPLE_CHOICE]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               allowMultiple:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 */
router.post(
  '/questions',
  [
    body('question').notEmpty().withMessage('La pregunta es requerida'),
    body('answerType').isIn(['TEXT', 'SELECT', 'MULTIPLE_CHOICE']).withMessage('Tipo de respuesta inválido'),
    body('options').optional().isArray().withMessage('Las opciones deben ser un array'),
    body('allowMultiple').optional().isBoolean().withMessage('allowMultiple debe ser un booleano')
  ],
  validateRequest,
  familyHistoryController.createQuestion
);

/**
 * @swagger
 * /api/family-history/config/questions/{id}:
 *   put:
 *     tags:
 *       - Antecedentes Familiares (Admin)
 *     summary: Actualizar una pregunta
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
 *               question:
 *                 type: string
 *               description:
 *                 type: string
 *               isRequired:
 *                 type: boolean
 *               answerType:
 *                 type: string
 *                 enum: [TEXT, SELECT, MULTIPLE_CHOICE]
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *               allowMultiple:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Pregunta no encontrada
 */
router.put(
  '/questions/:id',
  [
    body('answerType').optional().isIn(['TEXT', 'SELECT', 'MULTIPLE_CHOICE']).withMessage('Tipo de respuesta inválido'),
    body('options').optional().isArray().withMessage('Las opciones deben ser un array'),
    body('allowMultiple').optional().isBoolean().withMessage('allowMultiple debe ser un booleano')
  ],
  validateRequest,
  familyHistoryController.updateQuestion
);

/**
 * @swagger
 * /api/family-history/config/questions/{id}:
 *   delete:
 *     tags:
 *       - Antecedentes Familiares (Admin)
 *     summary: Eliminar una pregunta
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
 *         description: Pregunta eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Se requiere rol de administrador
 *       404:
 *         description: Pregunta no encontrada
 */
router.delete('/questions/:id', familyHistoryController.deleteQuestion);

export default router; 