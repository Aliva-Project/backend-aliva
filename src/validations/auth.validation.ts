import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('firstName')
    .notEmpty()
    .withMessage('El nombre es requerido'),
  body('lastName')
    .notEmpty()
    .withMessage('El apellido es requerido'),
  body('documentNumber')
    .notEmpty()
    .withMessage('El número de documento es requerido')
    .isString()
    .withMessage('El número de documento debe ser una cadena de texto'),
  body('username')
    .optional()
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto'),
  body('birthDate')
    .isISO8601()
    .withMessage('La fecha de nacimiento debe ser una fecha válida'),
  body('location')
    .notEmpty()
    .withMessage('La ubicación es requerida'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
]; 