import { Request, Response } from 'express';
import { SystemPromptService } from '../services/system-prompt.service';

export class SystemPromptController {
  private systemPromptService: SystemPromptService;

  constructor() {
    this.systemPromptService = new SystemPromptService();
  }

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
   *             properties:
   *               content:
   *                 type: string
   *               isActive:
   *                 type: boolean
   *               name:
   *                 type: string
   *                 description: Nombre descriptivo para el prompt
   *     responses:
   *       201:
   *         description: Prompt creado exitosamente
   */
  async createPrompt(req: Request, res: Response) {
    try {
      const { content, isActive, name } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'El contenido del prompt es requerido' });
      }

      const prompt = await this.systemPromptService.createPrompt(content, isActive, name);
      return res.status(201).json(prompt);
    } catch (error) {
      console.error('Error al crear prompt del sistema:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               content:
   *                 type: string
   *               isActive:
   *                 type: boolean
   *               name:
   *                 type: string
   *                 description: Nombre descriptivo para el prompt
   *     responses:
   *       200:
   *         description: Prompt actualizado exitosamente
   */
  async updatePrompt(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { content, isActive, name } = req.body;

      if (!content) {
        return res.status(400).json({ error: 'El contenido del prompt es requerido' });
      }

      const prompt = await this.systemPromptService.updatePrompt(
        parseInt(id),
        content,
        isActive,
        name
      );

      return res.json(prompt);
    } catch (error) {
      console.error('Error al actualizar prompt del sistema:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

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
   *     responses:
   *       200:
   *         description: Prompt eliminado exitosamente
   */
  async deletePrompt(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.systemPromptService.deletePrompt(parseInt(id));

      return res.json({ message: 'Prompt eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar prompt del sistema:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * @swagger
   * /api/system-prompts:
   *   get:
   *     summary: Obtiene todos los prompts del sistema
   *     tags: [System Prompts]
   *     responses:
   *       200:
   *         description: Lista de prompts del sistema
   */
  async getAllPrompts(req: Request, res: Response) {
    try {
      const prompts = await this.systemPromptService.getAllPrompts();
      return res.json(prompts);
    } catch (error) {
      console.error('Error al obtener prompts del sistema:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async getPromptById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const prompt = await this.systemPromptService.getPromptById(parseInt(id));
      return res.json(prompt);
    } catch (error: any) {
      console.error('Error al obtener prompt del sistema:', error);
      if (error.message === 'Prompt no encontrado') {
        return res.status(404).json({ error: 'Prompt no encontrado' });
      }
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
} 