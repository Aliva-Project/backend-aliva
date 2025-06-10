import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RelevantHabitService {
  // Métodos para administradores
  async createQuestion(data: { question: string; options: string[] }) {
    return prisma.relevantHabitQuestion.create({
      data: {
        question: data.question,
        options: data.options,
      },
    });
  }

  async updateQuestion(id: string, data: { question: string; options: string[] }) {
    return prisma.relevantHabitQuestion.update({
      where: { id },
      data: {
        question: data.question,
        options: data.options,
      },
    });
  }

  async deleteQuestion(id: string) {
    return prisma.relevantHabitQuestion.delete({
      where: { id },
    });
  }

  async getAllQuestions() {
    return prisma.relevantHabitQuestion.findMany();
  }

  async getQuestionById(id: string) {
    return prisma.relevantHabitQuestion.findUnique({
      where: { id },
    });
  }

  // Métodos para usuarios
  async createAnswer(userId: number, questionId: string, answer: string) {
    return prisma.relevantHabitAnswer.create({
      data: {
        answer,
        questionId,
        userId,
      },
    });
  }

  async updateAnswer(id: string, answer: string) {
    return prisma.relevantHabitAnswer.update({
      where: { id },
      data: { answer },
    });
  }

  async deleteAnswer(id: string) {
    return prisma.relevantHabitAnswer.delete({
      where: { id },
    });
  }

  async getUserAnswers(userId: number) {
    return prisma.relevantHabitAnswer.findMany({
      where: { userId },
      include: {
        question: true,
      },
    });
  }

  async getAnswerById(id: string) {
    return prisma.relevantHabitAnswer.findUnique({
      where: { id },
      include: {
        question: true,
      },
    });
  }
} 