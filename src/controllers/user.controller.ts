import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await userService.getUserByToken(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
}; 