import { Router } from 'express';
import { VirtualAssistantController } from '../controllers/virtualAssistant.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const virtualAssistantController = new VirtualAssistantController();

router.post(
  '/message/:userId',
  authenticate,
  virtualAssistantController.processMessage.bind(virtualAssistantController)
);

export default router; 