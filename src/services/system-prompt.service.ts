import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SystemPromptService {
  async createPrompt(content: string, isActive: boolean = false, name?: string) {
    try {
      // Si el nuevo prompt será activo, desactivar todos los demás
      if (isActive) {
        await prisma.systemPrompt.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      return await prisma.systemPrompt.create({
        data: {
          name: name || `Prompt ${new Date().toISOString()}`,
          content,
          isActive,
        },
      });
    } catch (error) {
      console.error('Error al crear prompt del sistema:', error);
      throw error;
    }
  }

  async updatePrompt(id: number, content: string, isActive: boolean, name?: string) {
    try {
      // Si el prompt será activo, desactivar todos los demás
      if (isActive) {
        await prisma.systemPrompt.updateMany({
          where: { isActive: true },
          data: { isActive: false },
        });
      }

      return await prisma.systemPrompt.update({
        where: { id },
        data: {
          content,
          isActive,
          ...(name && { name }),
        },
      });
    } catch (error) {
      console.error('Error al actualizar prompt del sistema:', error);
      throw error;
    }
  }

  async deletePrompt(id: number) {
    try {
      await prisma.systemPrompt.delete({ where: { id } });
    } catch (error) {
      console.error('Error al eliminar prompt del sistema:', error);
      throw error;
    }
  }

  async getAllPrompts() {
    try {
      return await prisma.systemPrompt.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Error al obtener prompts del sistema:', error);
      throw error;
    }
  }

  async getPromptById(id: number) {
    try {
      const prompt = await prisma.systemPrompt.findUnique({
        where: { id },
      });

      if (!prompt) {
        throw new Error('Prompt no encontrado');
      }

      return prompt;
    } catch (error) {
      console.error('Error al obtener prompt del sistema:', error);
      throw error;
    }
  }
} 