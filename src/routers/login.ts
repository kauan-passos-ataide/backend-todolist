import { Router } from 'express';
import { findUser } from '../services/user';
import { loginMiddleware } from '../middlewares/user/auth';
import { loginController } from '../controllers/user.controller';

export const loginRouter = Router();

loginRouter.post('/', loginMiddleware, async (req, res) => {
    const { email, password } = req.body;

    const token = await loginController(email, password);
    if (!token) {
        res.status(401).json({ error: 'Invalid email or password'})
        return;
    }
    res.json({ token });
});