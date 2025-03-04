import { RequestHandler } from 'express';

export const authMiddleware: RequestHandler = (req, res, next) => {

}

export const loginMiddleware: RequestHandler = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404).json({ error: 'Email and password are required' });
        return;
    }
    next();
}