import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export class EducationalCategoryService {
  // Métodos para administradores
  async createCategory(data: {
    name: string,
    description?: string}) {
    return prisma.educationalCategory.create({
      data
    });
  }

  async updateCategory(id: number, data: { name?: string; description?: string }) {
    return prisma.educationalCategory.update({
      where: { id },
      data
    });
  }

  async deleteCategory(id: number) {
    return prisma.educationalCategory.delete({
      where: { id }
    });
  }

  // Métodos para usuarios
  async getAllCategories() {
    return prisma.educationalCategory.findMany();
  }

  async getCategoryById(id: number) {
    return prisma.educationalCategory.findUnique({
      where: { id }
    });
  }
}