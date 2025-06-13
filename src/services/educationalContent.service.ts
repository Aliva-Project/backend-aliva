import {ContentType, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class EducationalContentService {
  // Métodos para administradores
  async createContent(data: {
    title: string,
    description?: string,
    categoryId: number,
    contentUrl: string,
    type: ContentType,
    content: string,
  }) {
    return prisma.educationalContent.create({
      data
    });
  }

  async updateContent(id: number, data: {
      title?: string;
      description?: string;
      categoryId?: number;
      contentUrl?: string;
      type: ContentType;
      content?: string
  }) {
    return prisma.educationalContent.update({
      where: { id },
      data
    });
  }

  async deleteContent(id: number) {
    return prisma.educationalContent.delete({
      where: { id }
    });
  }

  // Métodos para usuarios
  async getAllContents() {
    return prisma.educationalContent.findMany({
      include: {
        category: true, // Incluye la categoría asociada
      },
      orderBy: { createdAt: 'desc' } // Ordena por fecha de creación
    });
  }

  async getContentById(id: number) {
    return prisma.educationalContent.findUnique({
      where: { id },
        include: {
            category: true, // Incluye la categoría asociada
        }
    });
  }
}