import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  username?: string;
  birthDate: Date;
  location: string;
}

export class AuthService {
  async register(data: RegisterData) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { documentNumber: data.documentNumber }
        ]
      }
    });

    if (existingUser) {
      throw new Error('El email o número de documento ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        documentNumber: data.documentNumber,
        username: data.username,
        birthDate: data.birthDate,
        location: data.location
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
        firstName: true,
        lastName: true,
        documentNumber: true,
        username: true,
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