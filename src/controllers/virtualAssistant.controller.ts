import { Request, Response } from 'express';
import { VirtualAssistantService } from '../services/virtualAssistant.service';

export class VirtualAssistantController {
  private virtualAssistantService: VirtualAssistantService;

  constructor() {
    this.virtualAssistantService = new VirtualAssistantService();
  }

  /**
   * @swagger
   * /api/assistant/{userId}/message:
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
  async processMessage(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'El mensaje es requerido' });
      }

      const response = await this.virtualAssistantService.processMessage(
        parseInt(userId),
        message
      );

      return res.json(response);
    } catch (error) {
      console.error('Error en el controlador del asistente virtual:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

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
  async getConversationHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { limit } = req.query;

      const history = await this.virtualAssistantService.getConversationHistory(
        parseInt(userId),
        limit ? parseInt(limit as string) : undefined
      );

      return res.json(history);
    } catch (error) {
      console.error('Error al obtener historial de conversación:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * @swagger
   * /api/assistant/{userId}/history:
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
  async deleteConversationHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      await this.virtualAssistantService.deleteConversationHistory(parseInt(userId));

      return res.json({ message: 'Historial eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar historial de conversación:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 