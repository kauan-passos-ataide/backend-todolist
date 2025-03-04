import { RequestHandler } from 'express';
import passport from 'passport';
import { User } from '@prisma/client';

export const authJwtMiddleware: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('jwt', 
        (err: any, user: User | false) => {
            if (user) {
                req.user = user;
                return next();
            } 
            return res.status(401).json({ error: 'Unauthorized' });
        }
    );

    authRequest(req, res, next);
}

export const loginMiddleware: RequestHandler = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404).json({ error: 'Email and password are required' });
        return;
    }
    next();
}