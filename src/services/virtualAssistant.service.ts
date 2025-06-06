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
      // Obtener el prompt del sistema
      const systemPrompt = await prisma.systemPrompt.findFirst({
        where: { isActive: true },
      });

      if (!systemPrompt) {
        throw new Error('No hay un prompt del sistema activo');
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
      };
    } catch (error) {
      console.error('Error en el servicio del asistente virtual:', error);
      throw error;
    }
  }
} 