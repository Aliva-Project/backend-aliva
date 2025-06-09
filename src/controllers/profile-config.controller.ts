import { Request, Response } from 'express';
import { ProfileConfigService } from '../services/profile-config.service';
import { body } from 'express-validator';

const profileConfigService = new ProfileConfigService();

export const createConfig = async (req: Request, res: Response) => {
  try {
    const { fieldName, displayName, isRequired, fieldType } = req.body;
    const config = await profileConfigService.createConfig({
      fieldName,
      displayName,
      isRequired,
      fieldType
    });
    res.status(201).json(config);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al crear la configuración' });
    }
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { displayName, isRequired, fieldType } = req.body;
    const config = await profileConfigService.updateConfig(parseInt(id), {
      displayName,
      isRequired,
      fieldType
    });
    res.json(config);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar la configuración' });
    }
  }
};

export const deleteConfig = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await profileConfigService.deleteConfig(parseInt(id));
    res.json({ message: 'Configuración eliminada exitosamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al eliminar la configuración' });
    }
  }
};

export const getAllConfigs = async (req: Request, res: Response) => {
  try {
    const configs = await profileConfigService.getAllConfigs();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las configuraciones' });
  }
};

export const getConfigById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const config = await profileConfigService.getConfigById(parseInt(id));
    if (!config) {
      return res.status(404).json({ message: 'Configuración no encontrada' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la configuración' });
  }
}; 