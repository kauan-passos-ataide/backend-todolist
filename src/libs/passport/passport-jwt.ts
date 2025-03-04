import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { prisma } from '../prisma/prisma';
import "dotenv/config";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
}

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: payload.email } });

        if (!user) {
            return done(null, false);
        }

        return done(null, user.email);
    }
    catch (error) {
        return done(error, false)
    }
})