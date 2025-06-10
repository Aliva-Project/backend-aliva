import { PrismaClient, Prisma } from '@prisma/client';

export class FamilyHistoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Métodos para administradores
  async createQuestion(data: {
    question: string;
    description?: string;
    isRequired?: boolean;
    answerType: 'TEXT' | 'SELECT' | 'MULTIPLE_CHOICE';
    options?: string[];
    allowMultiple?: boolean;
  }) {
    const { options, ...rest } = data;
    return this.prisma.familyHistoryQuestion.create({
      data: {
        ...rest,
        options: options ? { options } : undefined
      }
    });
  }

  async updateQuestion(id: number, data: {
    question?: string;
    description?: string;
    isRequired?: boolean;
    answerType?: 'TEXT' | 'SELECT' | 'MULTIPLE_CHOICE';
    options?: string[];
    allowMultiple?: boolean;
  }) {
    const { options, ...rest } = data;
    return this.prisma.familyHistoryQuestion.update({
      where: { id },
      data: {
        ...rest,
        options: options ? { options } : undefined
      }
    });
  }

  async deleteQuestion(id: number) {
    return this.prisma.familyHistoryQuestion.delete({
      where: { id }
    });
  }

  // Métodos para usuarios
  async getAllQuestions() {
    return this.prisma.familyHistoryQuestion.findMany({
      orderBy: { order: 'asc' }
    });
  }

  async getQuestionById(id: number) {
    return this.prisma.familyHistoryQuestion.findUnique({
      where: { id }
    });
  }

  async submitAnswer(userId: number, questionId: number, data: {
    answer: string;
    details?: string;
  }) {
    return this.prisma.familyHistoryAnswer.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      update: {
        answer: data.answer,
        details: data.details,
      },
      create: {
        userId,
        questionId,
        answer: data.answer,
        details: data.details,
      },
    });
  }

  async updateAnswer(id: number, userId: number, data: {
    answer: string;
    details?: string;
  }) {
    const answer = await this.prisma.familyHistoryAnswer.findUnique({
      where: { id }
    });

    if (!answer || answer.userId !== userId) {
      throw new Error('Respuesta no encontrada o no tienes permiso para modificarla');
    }

    return this.prisma.familyHistoryAnswer.update({
      where: { id },
      data: {
        answer: data.answer,
        details: data.details,
      }
    });
  }

  async getUserAnswers(userId: number) {
    return this.prisma.familyHistoryAnswer.findMany({
      where: { userId },
      include: {
        question: true,
      },
    });
  }

  async getAnswerById(id: number, userId: number) {
    return this.prisma.familyHistoryAnswer.findFirst({
      where: {
        id,
        userId
      },
      include: {
        question: true,
      },
    });
  }

  async deleteAnswer(id: number, userId: number) {
    const answer = await this.prisma.familyHistoryAnswer.findUnique({
      where: { id }
    });

    if (!answer || answer.userId !== userId) {
      throw new Error('Respuesta no encontrada o no tienes permiso para eliminarla');
    }

    return this.prisma.familyHistoryAnswer.delete({
      where: { id }
    });
  }
} 