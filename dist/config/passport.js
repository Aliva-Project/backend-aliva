"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
const configurePassport = (passport) => {
    passport.use(new passport_jwt_1.Strategy(options, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: jwt_payload.id }
            });
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }
        catch (error) {
            return done(error, false);
        }
    }));
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }));
};
exports.configurePassport = configurePassport;
