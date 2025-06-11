import { body } from 'express-validator';

export const updateUserValidation = [
  body('firstName')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .trim()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío'),
  
  body('lastName')
    .optional()
    .isString()
    .withMessage('El apellido debe ser una cadena de texto')
    .trim()
    .notEmpty()
    .withMessage('El apellido no puede estar vacío'),
  
  body('username')
    .optional()
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto')
    .trim()
    .notEmpty()
    .withMessage('El nombre de usuario no puede estar vacío'),
  
  body('birthDate')
    .optional()
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida'),
  
  body('location')
    .optional()
    .isString()
    .withMessage('La ubicación debe ser una cadena de texto')
    .trim()
    .notEmpty()
    .withMessage('La ubicación no puede estar vacía')
]; 