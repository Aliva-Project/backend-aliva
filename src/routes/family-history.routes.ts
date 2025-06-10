import { Router } from 'express';
import { FamilyHistoryController } from '../controllers/family-history.controller';
import { authenticate } from '../middleware/auth';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();
const familyHistoryController = new FamilyHistoryController();

// Rutas para administradores
router.post('/config/questions', authenticate, isAdmin, familyHistoryController.createQuestion);
router.put('/config/questions/:id', authenticate, isAdmin, familyHistoryController.updateQuestion);
router.delete('/config/questions/:id', authenticate, isAdmin, familyHistoryController.deleteQuestion);

// Rutas para usuarios
router.get('/questions', familyHistoryController.getAllQuestions);
router.get('/questions/:id', familyHistoryController.getQuestionById);
router.post('/questions/:questionId/answers', authenticate, familyHistoryController.submitAnswer);
router.put('/answers/:id', authenticate, familyHistoryController.updateAnswer);
router.get('/answers', authenticate, familyHistoryController.getUserAnswers);
router.get('/answers/:id', authenticate, familyHistoryController.getAnswerById);
router.delete('/answers/:id', authenticate, familyHistoryController.deleteAnswer);

export default router; 