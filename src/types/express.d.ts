import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends Omit<User, 'password'> {
      role: 'USER' | 'ADMIN';
    }
  }
} 