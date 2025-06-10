import { PrismaClient, MessageType, MessageSender } from '@prisma/client';
import OpenAI from 'openai';
import { config } from '../config';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export class VirtualAssistantService {
  async processMessage(userId: number, message: string) {
    try {
      // Validar que la API key esté configurada
      if (!config.openai.apiKey) {
        throw new Error('La API key de OpenAI no está configurada');
      }

      // Obtener el prompt del sistema
      const systemPrompt = await prisma.systemPrompt.findFirst({
        where: { name: config.virtualAssistant.contextName },
      });

      if (!systemPrompt) {
        throw new Error(`No hay un prompt del sistema activo con el nombre: ${config.virtualAssistant.contextName}`);
      }

      // Obtener el historial de mensajes
      const messageHistory = await prisma.virtualAssistantMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 6,
        select: {
          message: true,
          sender: true,
        },
      });

      // Preparar el historial para OpenAI
      const messages = [
        { role: 'system', content: systemPrompt.content },
        ...messageHistory.reverse().map(msg => ({
          role: msg.sender === MessageSender.USER ? 'user' : 'assistant',
          content: msg.message,
        })),
        { role: 'user', content: message },
      ];

      try {
        // Obtener respuesta de OpenAI
        const completion = await openai.chat.completions.create({
          model: config.openai.model,
          messages: messages as any,
          temperature: 0.7,
          max_tokens: 500,
        });

        const assistantResponse = completion.choices[0].message.content;

        if (!assistantResponse) {
          throw new Error('No se recibió respuesta del asistente');
        }

        // Guardar mensaje del usuario
        await prisma.virtualAssistantMessage.create({
          data: {
            userId,
            message,
            type: MessageType.TEXT,
            sender: MessageSender.USER,
          },
        });

        // Guardar respuesta del asistente
        await prisma.virtualAssistantMessage.create({
          data: {
            userId,
            message: assistantResponse,
            type: MessageType.TEXT,
            sender: MessageSender.ASSISTANT,
          },
        });

        return {
          message: assistantResponse,
          messageHistory,
        };
      } catch (openaiError: any) {
        // Manejar errores específicos de OpenAI
        if (openaiError.status === 401) {
          throw new Error('Error de autenticación con OpenAI. Por favor, verifica la API key.');
        } else if (openaiError.status === 429) {
          throw new Error('Se ha excedido el límite de solicitudes a OpenAI. Por favor, intenta más tarde.');
        } else {
          throw new Error(`Error al comunicarse con OpenAI: ${openaiError.message}`);
        }
      }
    } catch (error: any) {
      console.error('Error en el servicio del asistente virtual:', error);
      // Devolver un mensaje de error amigable
      return {
        message: `Lo siento, ha ocurrido un error: ${error.message}`,
        error: true,
        messageHistory: [],
      };
    }
  }

  async getConversationHistory(userId: number, limit?: number) {
    try {
      const messages = await prisma.virtualAssistantMessage.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit || 10,
        select: {
          id: true,
          message: true,
          sender: true,
          type: true,
          createdAt: true,
        },
      });

      return messages.reverse();
    } catch (error) {
      console.error('Error al obtener historial de conversación:', error);
      throw error;
    }
  }

  async deleteConversationHistory(userId: number) {
    try {
      await prisma.virtualAssistantMessage.deleteMany({
        where: { userId },
      });
    } catch (error) {
      console.error('Error al eliminar historial de conversación:', error);
      throw error;
    }
  }

  async createSystemPrompt(content: string, isActive: boolean = false, name?: string) {
    try {
      // Si el nuevo prompt será activo, desactivar todos los demás
      if (isActive) {
        await prisma.systemPrompt.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      const prompt = await prisma.systemPrompt.create({
        data: {
          name: name || `Prompt ${new Date().toISOString()}`,
          content,
          isActive,
        },
      });

      return prompt;
    } catch (error) {
      console.error('Error al crear prompt del sistema:', error);
      throw error;
    }
  }

  async updateSystemPrompt(id: number, content: string, isActive: boolean, name?: string) {
    try {
      // Si el prompt será activo, desactivar todos los demás
      if (isActive) {
        await prisma.systemPrompt.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      const prompt = await prisma.systemPrompt.update({
        where: { id },
        data: {
          content,
          isActive,
          ...(name && { name }),
        },
      });

      return prompt;
    } catch (error) {
      console.error('Error al actualizar prompt del sistema:', error);
      throw error;
    }
  }

  async deleteSystemPrompt(id: number) {
    try {
      await prisma.systemPrompt.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error al eliminar prompt del sistema:', error);
      throw error;
    }
  }
} 