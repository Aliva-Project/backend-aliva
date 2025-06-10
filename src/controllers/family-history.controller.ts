import { Request, Response } from 'express';
import { FamilyHistoryService } from '../services/family-history.service';

export class FamilyHistoryController {
  private familyHistoryService: FamilyHistoryService;

  constructor() {
    this.familyHistoryService = new FamilyHistoryService();
  }

  // Métodos para administradores
  createQuestion = async (req: Request, res: Response) => {
    try {
      const question = await this.familyHistoryService.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al crear la pregunta' });
      }
    }
  };

  updateQuestion = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const question = await this.familyHistoryService.updateQuestion(Number(id), req.body);
      res.json(question);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al actualizar la pregunta' });
      }
    }
  };

  deleteQuestion = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.familyHistoryService.deleteQuestion(Number(id));
      res.json({ message: 'Pregunta eliminada exitosamente' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al eliminar la pregunta' });
      }
    }
  };

  // Métodos para usuarios
  getAllQuestions = async (req: Request, res: Response) => {
    try {
      const questions = await this.familyHistoryService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las preguntas' });
    }
  };

  getQuestionById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const question = await this.familyHistoryService.getQuestionById(Number(id));
      
      if (!question) {
        return res.status(404).json({ message: 'Pregunta no encontrada' });
      }
      
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la pregunta' });
    }
  };

  submitAnswer = async (req: Request, res: Response) => {
    try {
      const { questionId } = req.params;
      const userId = (req.user as any).id;
      const answer = await this.familyHistoryService.submitAnswer(userId, Number(questionId), req.body);
      res.status(201).json(answer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al enviar la respuesta' });
      }
    }
  };

  updateAnswer = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req.user as any).id;
      const answer = await this.familyHistoryService.updateAnswer(Number(id), userId, req.body);
      res.json(answer);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al actualizar la respuesta' });
      }
    }
  };

  getUserAnswers = async (req: Request, res: Response) => {
    try {
      const userId = (req.user as any).id;
      const answers = await this.familyHistoryService.getUserAnswers(userId);
      res.json(answers);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las respuestas' });
    }
  };

  getAnswerById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req.user as any).id;
      const answer = await this.familyHistoryService.getAnswerById(Number(id), userId);
      
      if (!answer) {
        return res.status(404).json({ message: 'Respuesta no encontrada' });
      }
      
      res.json(answer);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la respuesta' });
    }
  };

  deleteAnswer = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = (req.user as any).id;
      await this.familyHistoryService.deleteAnswer(Number(id), userId);
      res.json({ message: 'Respuesta eliminada exitosamente' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Error al eliminar la respuesta' });
      }
    }
  };
} 