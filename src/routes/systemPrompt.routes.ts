import { Router } from 'express';
import { SystemPromptController } from '../controllers/systemPrompt.controller';

const router = Router();
const systemPromptController = new SystemPromptController();

/**
 * @swagger
 * tags:
 *   name: System Prompts
 *   description: Gestión de prompts del sistema para el asistente virtual
 * 
 * components:
 *   schemas:
 *     SystemPrompt:
 *       type: object
 *       required:
 *         - content
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del prompt
 *         name:
 *           type: string
 *           description: Nombre descriptivo del prompt
 *         content:
 *           type: string
 *           description: Contenido del prompt del sistema
 *         isActive:
 *           type: boolean
 *           description: Indica si el prompt está activo
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del prompt
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 */

/**
 * @swagger
 * /api/system-prompts:
 *   get:
 *     summary: Obtiene todos los prompts del sistema
 *     tags: [System Prompts]
 *     responses:
 *       200:
 *         description: Lista de prompts del sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SystemPrompt'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/system-prompts:
 *   post:
 *     summary: Crea un nuevo prompt del sistema
 *     tags: [System Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del prompt
 *               name:
 *                 type: string
 *                 description: Nombre descriptivo del prompt
 *               isActive:
 *                 type: boolean
 *                 description: Indica si el prompt debe estar activo
 *     responses:
 *       201:
 *         description: Prompt creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemPrompt'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/system-prompts/{id}:
 *   put:
 *     summary: Actualiza un prompt del sistema
 *     tags: [System Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del prompt a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del prompt
 *               name:
 *                 type: string
 *                 description: Nombre descriptivo del prompt
 *               isActive:
 *                 type: boolean
 *                 description: Indica si el prompt debe estar activo
 *     responses:
 *       200:
 *         description: Prompt actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemPrompt'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Prompt no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/system-prompts/{id}:
 *   delete:
 *     summary: Elimina un prompt del sistema
 *     tags: [System Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del prompt a eliminar
 *     responses:
 *       200:
 *         description: Prompt eliminado exitosamente
 *       404:
 *         description: Prompt no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/system-prompts/{id}:
 *   get:
 *     summary: Obtiene un prompt del sistema por su ID
 *     tags: [System Prompts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del prompt a obtener
 *     responses:
 *       200:
 *         description: Prompt encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemPrompt'
 *       404:
 *         description: Prompt no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', systemPromptController.getAllPrompts.bind(systemPromptController));
router.get('/:id', systemPromptController.getPromptById.bind(systemPromptController));
router.post('/', systemPromptController.createPrompt.bind(systemPromptController));
router.put('/:id', systemPromptController.updatePrompt.bind(systemPromptController));
router.delete('/:id', systemPromptController.deletePrompt.bind(systemPromptController));

export default router; 