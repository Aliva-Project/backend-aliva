import { PrismaClient } from '@prisma/client';

export class ControlHistoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Métodos para administradores
  async createQuestion(data: {
    question: string;
    description?: string;
    isRequired?: boolean;
  }) {
    return this.prisma.controlHistoryQuestion.create({
      data
    });
  }

  async updateQuestion(id: number, data: {
    question?: string;
    description?: string;
    isRequired?: boolean;
  }) {
    return this.prisma.controlHistoryQuestion.update({
      where: { id },
      data
    });
  }

  async deleteQuestion(id: number) {
    return this.prisma.controlHistoryQuestion.delete({
      where: { id }
    });
  }

  // Métodos para usuarios
  async getAllQuestions() {
    return this.prisma.controlHistoryQuestion.findMany({
      orderBy: { order: 'asc' }
    });
  }

  async getQuestionById(id: number) {
    return this.prisma.controlHistoryQuestion.findUnique({
      where: { id }
    });
  }

  async submitAnswer(userId: number, questionId: number, data: {
    date: Date;
    details?: string;
  }) {
    return this.prisma.controlHistoryAnswer.upsert({
      where: {
        userId_questionId: {
          userId,
          questionId,
        },
      },
      update: {
        date: data.date,
        details: data.details,
      },
      create: {
        userId,
        questionId,
        date: data.date,
        details: data.details,
      },
    });
  }

  async updateAnswer(id: number, userId: number, data: {
    date: Date;
    details?: string;
  }) {
    const answer = await this.prisma.controlHistoryAnswer.findUnique({
      where: { id }
    });

    if (!answer || answer.userId !== userId) {
      throw new Error('Respuesta no encontrada o no tienes permiso para modificarla');
    }

    return this.prisma.controlHistoryAnswer.update({
      where: { id },
      data: {
        date: data.date,
        details: data.details,
      }
    });
  }

  async getUserAnswers(userId: number) {
    return this.prisma.controlHistoryAnswer.findMany({
      where: { userId },
      include: {
        question: true,
      },
    });
  }

  async getAnswerById(id: number, userId: number) {
    return this.prisma.controlHistoryAnswer.findFirst({
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
    const answer = await this.prisma.controlHistoryAnswer.findUnique({
      where: { id }
    });

    if (!answer || answer.userId !== userId) {
      throw new Error('Respuesta no encontrada o no tienes permiso para eliminarla');
    }

    return this.prisma.controlHistoryAnswer.delete({
      where: { id }
    });
  }
} 