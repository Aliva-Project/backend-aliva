import { Request, Response } from 'express';
import { RelevantHabitService } from '../services/relevant-habit.service';

const relevantHabitService = new RelevantHabitService();

export class RelevantHabitController {
  // Métodos para administradores
  async createQuestion(req: Request, res: Response) {
    try {
      const { question, options } = req.body;
      const result = await relevantHabitService.createQuestion({ question, options });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la pregunta' });
    }
  }

  async updateQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { question, options } = req.body;
      const result = await relevantHabitService.updateQuestion(id, { question, options });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la pregunta' });
    }
  }

  async deleteQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await relevantHabitService.deleteQuestion(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la pregunta' });
    }
  }

  async getAllQuestions(req: Request, res: Response) {
    try {
      const questions = await relevantHabitService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
  }

  async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await relevantHabitService.getQuestionById(id);
      if (!question) {
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }
      res.json(question);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la pregunta' });
    }
  }

  // Métodos para usuarios
  async createAnswer(req: Request, res: Response) {
    try {
      const { questionId } = req.params;
      const { answer } = req.body;
      const userId = Number((req.user as any)?.id);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const result = await relevantHabitService.createAnswer(userId, questionId, answer);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la respuesta' });
    }
  }

  async updateAnswer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { answer } = req.body;
      const result = await relevantHabitService.updateAnswer(id, answer);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar la respuesta' });
    }
  }

  async deleteAnswer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await relevantHabitService.deleteAnswer(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la respuesta' });
    }
  }

  async getUserAnswers(req: Request, res: Response) {
    try {
      const userId = Number((req.user as any)?.id);
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const answers = await relevantHabitService.getUserAnswers(userId);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las respuestas' });
    }
  }

  async getAnswerById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const answer = await relevantHabitService.getAnswerById(id);
      if (!answer) {
        return res.status(404).json({ error: 'Respuesta no encontrada' });
      }
      res.json(answer);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la respuesta' });
    }
  }
} 