import { Request, Response } from 'express';
import { UserProfileService } from '../services/user-profile.service';

const userProfileService = new UserProfileService();

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const { name, email, phone, birthDate } = req.body;
    
    const profile = await userProfileService.updateProfile(userId, {
      name,
      email,
      phone,
      birthDate: birthDate ? new Date(birthDate) : undefined
    });
    
    res.json(profile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any).id;
    const profile = await userProfileService.getProfile(userId);
    
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
}; 