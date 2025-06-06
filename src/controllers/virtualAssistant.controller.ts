import { Request, Response } from 'express';
import { VirtualAssistantService } from '../services/virtualAssistant.service';

export class VirtualAssistantController {
  private virtualAssistantService: VirtualAssistantService;

  constructor() {
    this.virtualAssistantService = new VirtualAssistantService();
  }

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
} 