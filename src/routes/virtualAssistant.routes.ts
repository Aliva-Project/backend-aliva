import { Router } from 'express';
import { VirtualAssistantController } from '../controllers/virtualAssistant.controller';

const router = Router();
const virtualAssistantController = new VirtualAssistantController();

/**
 * @swagger
 * tags:
 *   name: Virtual Assistant
 *   description: Endpoints para el asistente virtual
 */

/**
 * @swagger
 * /api/virtual-assistant/{userId}/message:
 *   post:
 *     summary: Procesa un mensaje del usuario y obtiene respuesta del asistente
 *     tags: [Virtual Assistant]
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta del asistente
 */
router.post('/:userId/message', virtualAssistantController.processMessage.bind(virtualAssistantController));

/**
 * @swagger
 * /api/assistant/{userId}/history:
 *   get:
 *     summary: Obtiene el historial de conversación del usuario
 *     tags: [Virtual Assistant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Historial de conversación
 */
router.get('/:userId/history', virtualAssistantController.getConversationHistory.bind(virtualAssistantController));

/**
 * @swagger
 * /api/virtual-assistant/{userId}/history:
 *   delete:
 *     summary: Elimina el historial de conversación del usuario
 *     tags: [Virtual Assistant]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial eliminado exitosamente
 */
router.delete('/:userId/history', virtualAssistantController.deleteConversationHistory.bind(virtualAssistantController));

export default router; 