import { PrismaClient, ProfileConfig, FieldType } from '@prisma/client';

const prisma = new PrismaClient();

export class ProfileConfigService {
  async createConfig(data: {
    fieldName: string;
    displayName: string;
    isRequired: boolean;
    fieldType: FieldType;
  }) {
    return prisma.profileConfig.create({
      data
    });
  }

  async updateConfig(id: number, data: {
    displayName?: string;
    isRequired?: boolean;
    fieldType?: FieldType;
  }) {
    return prisma.profileConfig.update({
      where: { id },
      data
    });
  }

  async deleteConfig(id: number) {
    return prisma.profileConfig.delete({
      where: { id }
    });
  }

  async getAllConfigs() {
    return prisma.profileConfig.findMany();
  }

  async getConfigById(id: number) {
    return prisma.profileConfig.findUnique({
      where: { id }
    });
  }
} 