import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserProfileService {
  async updateProfile(userId: number, data: {
    name?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
  }) {
    const { phone, ...restData } = data;
    const profileData = phone ? { phone } : undefined;

    return prisma.user.update({
      where: { id: userId },
      data: {
        ...restData,
        profile: profileData
      },
      select: {
        id: true,
        username: true,
        email: true,
        profile: true,
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
        username: true,
        email: true,
        profile: true,
        birthDate: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
} 