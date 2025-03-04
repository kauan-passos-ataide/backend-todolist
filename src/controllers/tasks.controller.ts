import { createSubTask, createTask, getTasks, getSubTasks, updateTask, updateSubTask, deleteTask, deleteSubTask } from "../services/task";

export const getTasksController = async (email: string) => {
    if (!email) {
        return false;
    }
    const tasks = await getTasks(email as string);
    if (!tasks) {
        return false;
    }
    return tasks;
}

export const getSubTasksController = async (email: string, taskId: number) => {
    if (!email) {
        return false;
    }
    const subTasks = await getSubTasks(email as string, taskId);
    if (!subTasks) {
        return false;
    }
    return subTasks;
}

export const createTaskController = async (email: string, title: string) => {
    if (!email || !title) {
        return false;
    }
    const task = await createTask(email, title);
    if (!task) {
        return false;
    }
    return task;
}

export const createSubTaskController = async (email: string, taskId: number, title: string) => {
    if (!taskId || !title || !email) {
        return false;
    }
    const task = await createSubTask(email, taskId, title);
    if (!task) {
        return false;
    }
    return task;
}

export const updateTaskController = async (email: string, taskId: number, title: string, status: boolean) => {
    if (!email || !taskId || !title || !status) {
        return false;
    }
    const task = await updateTask(email, taskId, title, status);
    if (!task) {
        return false;
    }
    return task;
}

export const updateSubTaskController = async (email: string, taskId: number, title: string, status: boolean, subTaskId: number) => {
    if (!email || !taskId || !title || !status || !subTaskId) {
        return false;
    }
    const SubTask = await updateSubTask(email, taskId, title, status, subTaskId);
    if (!SubTask) {
        return false;
    }
    return SubTask;
}

export const deleteTaskController = async (email: string, taskId: number) => {
    if (!email || !taskId) {
        return false;
    }
    const task = await deleteTask(email, taskId);
    if (!task) {
        return false;
    }
    return true;
}

export const deleteSubTaskController = async (email: string, taskId: number, subTaskId: number) => {
    if (!email || !taskId || !subTaskId) {
        return false;
    }
    const subTask = await deleteSubTask(email, taskId, subTaskId);
    if (!subTask) {
        return false;
    }
    return true;
}