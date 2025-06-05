import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export const configurePassport = (passport: any) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload: any, done: any) => {
      try {
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id }
        });

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email: string, password: string, done: any) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' });
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}; 