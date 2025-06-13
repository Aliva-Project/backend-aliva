import {Request , Response} from 'express';
import {EducationalContentService} from '../services/educationalContent.service';

const educationalContentService = new EducationalContentService();

// Métodos para administradores
export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, description, categoryId, contentUrl, type, content } = req.body;
    const contentClient = await educationalContentService.createContent({
      title,
      description,
      categoryId,
      contentUrl,
      type,
      content
    });
    res.status(201).json(contentClient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al crear el contenido educativo'});
    }
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const content = await educationalContentService.updateContent(Number(id), req.body);
    res.json(content);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al actualizar el contenido educativo'});
    }
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    await educationalContentService.deleteContent(Number(id));
    res.json({message: 'Contenido educativo eliminado exitosamente'});
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error al eliminar el contenido educativo'});
    }
  }
};

// Métodos para usuarios
export const getAllContents = async (req: Request, res: Response) => {
  try {
    const contents = await educationalContentService.getAllContents();
    res.json(contents);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener los contenidos educativos'});
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const content = await educationalContentService.getContentById(Number(id));
    if (!content) {
      return res.status(404).json({message: 'Contenido educativo no encontrado'});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({message: 'Error al obtener el contenido educativo'});
  }
};
