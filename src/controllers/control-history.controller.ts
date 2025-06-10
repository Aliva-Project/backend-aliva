import { Request, Response } from 'express';
import { ControlHistoryService } from '../services/control-history.service';

const controlHistoryService = new ControlHistoryService();

// Controladores para administradores
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const { question, description, isRequired } = req.body;
    const result = await controlHistoryService.createQuestion({
      question,
      description,
      isRequired
    });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear la pregunta' });
    }
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, description, isRequired } = req.body;
    const result = await controlHistoryService.updateQuestion(Number(id), {
      question,
      description,
      isRequired
    });
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar la pregunta' });
    }
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await controlHistoryService.deleteQuestion(Number(id));
    res.json({ message: 'Pregunta eliminada exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar la pregunta' });
    }
  }
};

// Controladores para usuarios
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await controlHistoryService.getAllQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preguntas' });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await controlHistoryService.getQuestionById(Number(id));
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la pregunta' });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const { questionId } = req.params;
    const { date, details } = req.body;
    const result = await controlHistoryService.submitAnswer(userId, Number(questionId), {
      date: new Date(date),
      details
    });
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al enviar la respuesta' });
    }
  }
};

export const updateAnswer = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const { id } = req.params;
    const { date, details } = req.body;
    const result = await controlHistoryService.updateAnswer(Number(id), userId, {
      date: new Date(date),
      details
    });
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar la respuesta' });
    }
  }
};

export const getUserAnswers = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const answers = await controlHistoryService.getUserAnswers(userId);
    res.json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas' });
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const { id } = req.params;
    const answer = await controlHistoryService.getAnswerById(Number(id), userId);
    if (!answer) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    res.json(answer);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la respuesta' });
  }
};

export const deleteAnswer = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const { id } = req.params;
    await controlHistoryService.deleteAnswer(Number(id), userId);
    res.json({ message: 'Respuesta eliminada exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar la respuesta' });
    }
  }
}; 