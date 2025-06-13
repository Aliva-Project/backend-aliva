import {Router} from "express";
import {body} from "express-validator";
import {authenticate} from "../middleware/auth";
import {isAdmin} from "../middleware/isAdmin";
import {validateRequest} from "../middleware/validate-request";
import {
    createContent,
    updateContent,
    deleteContent,
    getAllContents,
    getContentById
} from "../controllers/educationalContent.controller";

const router = Router();

// Rutas para administradores
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    body('title').notEmpty().withMessage('El título es requerido'),
    body('description').optional(),
    body('categoryId').isInt().withMessage('El ID de la categoría debe ser un número entero'),
    body('contentUrl').optional().isURL().withMessage('La URL del contenido debe ser una URL válida'),
    body('type').isIn(['VIDEO', 'ARTICLE', 'PODCAST']).withMessage('El tipo debe ser VIDEO, ARTICLE o PODCAST'),
    body('content').optional()
  ],
  validateRequest,
  createContent
);

router.put(
  '/:id',
  authenticate,
  isAdmin,
  [
    body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
    body('description').optional(),
    body('categoryId').optional().isInt().withMessage('El ID de la categoría debe ser un número entero'),
    body('contentUrl').optional().isURL().withMessage('La URL del contenido debe ser una URL válida'),
    body('type').optional().isIn(['VIDEO', 'ARTICLE', 'PODCAST']).withMessage('El tipo debe ser VIDEO, ARTICLE o PODCAST'),
    body('content').optional()
  ],
  validateRequest,
  updateContent
);

router.delete('/:id', authenticate, isAdmin, deleteContent);
// Rutas para usuarios
router.get('/', authenticate, getAllContents);
router.get('/:id', authenticate, getContentById);

export default router;