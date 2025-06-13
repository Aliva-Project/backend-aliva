import {Router} from "express";
import {body} from "express-validator";
import {authenticate} from "../middleware/auth";
import {isAdmin} from "../middleware/isAdmin";
import {validateRequest} from "../middleware/validate-request";
import {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById
} from "../controllers/educationalCategory.controller";

const router = Router();

// Rutas para administradores
router.post(
  '/categories',
  authenticate,
  isAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('description').optional()
  ],
  validateRequest,
  createCategory
);

router.put(
  '/categories/:id',
  authenticate,
  isAdmin,
  [
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('description').optional()
  ],
  validateRequest,
  updateCategory
);

router.delete('/categories/:id', authenticate, isAdmin, deleteCategory);

// Rutas para usuarios
router.get('/categories', authenticate, getAllCategories);
router.get('/categories/:id', authenticate, getCategoryById);

export default router;