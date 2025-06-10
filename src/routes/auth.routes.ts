import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, getProfile } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validate-request';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('birthDate')
      .isISO8601()
      .withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('location')
      .notEmpty()
      .withMessage('La ubicación es requerida'),
  ],
  validateRequest,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
  ],
  validateRequest,
  login
);

router.get('/profile', authenticate, getProfile);

export default router; 