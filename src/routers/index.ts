import { Router } from 'express';
import { taskRouter } from './tasks';
import { loginRouter } from './login';

export const mainRouter = Router();

mainRouter.use('/tasks', taskRouter);
mainRouter.use('/login', loginRouter);