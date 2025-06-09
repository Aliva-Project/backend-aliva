import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async register(email: string, password: string, name: string) {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });

    const token = this.generateToken(user.id);

    return {
      message: 'Usuario registrado exitosamente',
      token
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user.id);

    return {
      message: 'Login exitoso',
      token
    };
  }

  async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }

  private generateToken(userId: number): string {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );
  }
} 