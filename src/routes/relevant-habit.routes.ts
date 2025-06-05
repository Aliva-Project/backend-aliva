import { Router } from 'express';
import { RelevantHabitController } from '../controllers/relevant-habit.controller';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();
const relevantHabitController = new RelevantHabitController();

// Rutas para administradores
router.post('/config/questions', authenticate, isAdmin, relevantHabitController.createQuestion);
router.put('/config/questions/:id', authenticate, isAdmin, relevantHabitController.updateQuestion);
router.delete('/config/questions/:id', authenticate, isAdmin, relevantHabitController.deleteQuestion);

// Rutas para usuarios
router.get('/questions', authenticate, relevantHabitController.getAllQuestions);
router.get('/questions/:id', authenticate, relevantHabitController.getQuestionById);
router.post('/questions/:questionId/answers', authenticate, relevantHabitController.createAnswer);
router.put('/answers/:id', authenticate, relevantHabitController.updateAnswer);
router.delete('/answers/:id', authenticate, relevantHabitController.deleteAnswer);
router.get('/answers', authenticate, relevantHabitController.getUserAnswers);
router.get('/answers/:id', authenticate, relevantHabitController.getAnswerById);

export default router; 