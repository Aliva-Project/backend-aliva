import {Request, Response} from 'express';
import {EducationalCategoryService} from '../services/educationalCategory.service';

const educationalCategoryService = new EducationalCategoryService();

// Métodos para administradores
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await educationalCategoryService.createCategory({
      name,
      description
    });
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al crear la categoría'});
    }
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const category = await educationalCategoryService.updateCategory(Number(id), req.body);
    res.json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al actualizar la categoría'});
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await educationalCategoryService.deleteCategory(Number(id));
    res.json({message: 'Categoría eliminada exitosamente'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al eliminar la categoría'});
    }
  }
};

// Métodos para usuarios
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await educationalCategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener las categorías'});
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const category = await educationalCategoryService.getCategoryById(Number(id));
    if (!category) {
      return res.status(404).json({message: 'Categoría no encontrada'});
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener la categoría'});
  }
};
