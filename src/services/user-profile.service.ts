import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserProfileService {
  async updateProfile(userId: number, data: {
    name?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
  }) {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async getProfile(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        birthDate: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
} 