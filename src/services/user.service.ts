import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        documentNumber: true,
        username: true,
        role: true,
        birthDate: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  async updateUser(id: number, data: {
    firstName?: string;
    lastName?: string;
    username?: string;
    birthDate?: Date;
    location?: string;
  }) {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        documentNumber: true,
        username: true,
        role: true,
        birthDate: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  async getUserByToken(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        documentNumber: true,
        username: true,
        role: true,
        birthDate: true,
        location: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }
} 