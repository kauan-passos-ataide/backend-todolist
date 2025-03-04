import { Router } from 'express';
import { authJwtMiddleware } from '../middlewares/user/auth';
import { 
    createSubTaskController, createTaskController, getTasksController, getSubTasksController, updateTaskController, updateSubTaskController, deleteTaskController, deleteSubTaskController 
} from '../controllers/tasks.controller';

export const taskRouter = Router();

const urlSubTasks = "/subTask";

taskRouter.get('/', authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const tasks = await getTasksController(email as string);
    if (!tasks) {
        res.status(404).json({ error: 'Tasks not found' });
        return;
    }
    res.json(tasks);
});
taskRouter.get(urlSubTasks, authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { taskId } = req.body;
    const subTasks = await getSubTasksController(email as string, taskId);
    if (!subTasks) {
        res.status(404).json({ error: 'SubTasks not found' });
        return;
    }
    res.json(subTasks);
});

taskRouter.post('/', authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
    }
    const task = await createTaskController(email as string, title);
    if (!task) {
        res.status(500).json({ error: 'Failed to create task' });
        return;
    }
    res.json(task);
});
taskRouter.post(urlSubTasks, authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { title, taskId } = req.body;
    if (!title || !taskId) {
        res.status(400).json({ error: 'Title and taskId are required' });
        return;
    }
    const subTask = await createSubTaskController(email as string, taskId, title);
    if (!subTask) {
        res.status(500).json({ error: 'Failed to create task' });
        return;
    }
    res.json(subTask);
});

taskRouter.put('/', authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { taskId, title, status } = await req.body;
    if (!taskId || !title || !status) {
        res.status(400).json({ error: 'TaskId, title and status are required' });
        return;
    }
    const updatedTask = await updateTaskController(email as string, taskId, title, status);
    if (!updatedTask) {
        res.status(404).json({ error: 'Task not updated' });
        return;
    }
    res.json(updatedTask);
});

taskRouter.put(urlSubTasks, authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { taskId, title, status, subTaskId } = await req.body;
    if (!taskId || !title || !status || !subTaskId) {
        res.status(400).json({ error: 'TaskId, title, status and subTaskId are required' });
        return;
    }
    const updatedSubTask = await updateSubTaskController(email as string, taskId, title, status, subTaskId);
    if (!updatedSubTask) {
        res.status(404).json({ error: 'SubTask not updated' });
        return;
    }
    res.json(updatedSubTask);
});

taskRouter.delete('/', authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { taskId } = await req.body;
    if (!taskId) {
        res.status(400).json({ error: 'TaskId is required' });
        return;
    }
    const deletedTask = await deleteTaskController(email as string, taskId);
    if (!deletedTask) {
        res.status(404).json({ error: 'Task not deleted' });
        return;
    }
    res.json(deletedTask);
});

taskRouter.delete(urlSubTasks, authJwtMiddleware, async (req, res) => {
    const email = await req.user;
    const { taskId, subTaskId } = await req.body;
    if (!taskId || !subTaskId) {
        res.status(400).json({ error: 'TaskId and subTaskId are required' });
        return;
    }
    const deletedSubTask = await deleteSubTaskController(email as string, taskId, subTaskId);
    if (!deletedSubTask) {
        res.status(404).json({ error: 'SubTask not deleted' });
        return;
    }
    res.json(deletedSubTask);
});