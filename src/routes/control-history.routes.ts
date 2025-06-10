import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';
import { validateRequest } from '../middleware/validate-request';
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  submitAnswer,
  updateAnswer,
  getUserAnswers,
  getAnswerById,
  deleteAnswer
} from '../controllers/control-history.controller';

const router = Router();

// Rutas para administradores
router.post(
  '/config/questions',
  authenticate,
  isAdmin,
  [
    body('question').notEmpty().withMessage('La pregunta es requerida'),
    body('description').optional(),
    body('isRequired').optional().isBoolean().withMessage('isRequired debe ser un booleano')
  ],
  validateRequest,
  createQuestion
);

router.put(
  '/config/questions/:id',
  authenticate,
  isAdmin,
  [
    body('question').optional().notEmpty().withMessage('La pregunta no puede estar vacía'),
    body('description').optional(),
    body('isRequired').optional().isBoolean().withMessage('isRequired debe ser un booleano')
  ],
  validateRequest,
  updateQuestion
);

router.delete('/config/questions/:id', authenticate, isAdmin, deleteQuestion);

// Rutas para usuarios
router.get('/questions', authenticate, getAllQuestions);
router.get('/questions/:id', authenticate, getQuestionById);

router.post(
  '/questions/:questionId/answers',
  authenticate,
  [
    body('date').isISO8601().withMessage('La fecha debe tener un formato válido'),
    body('details').optional()
  ],
  validateRequest,
  submitAnswer
);

router.put(
  '/answers/:id',
  authenticate,
  [
    body('date').isISO8601().withMessage('La fecha debe tener un formato válido'),
    body('details').optional()
  ],
  validateRequest,
  updateAnswer
);

router.get('/answers', authenticate, getUserAnswers);
router.get('/answers/:id', authenticate, getAnswerById);
router.delete('/answers/:id', authenticate, deleteAnswer);

export default router; 