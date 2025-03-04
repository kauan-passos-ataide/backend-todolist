import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { prisma } from '../prisma/prisma';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: payload.userId } });
        
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }
    catch (error) {
        return done(error, false)
    }
})