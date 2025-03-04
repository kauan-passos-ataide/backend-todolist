import { SubTask } from "@prisma/client";
import { prisma } from "../libs/prisma/prisma"

export const getTasks = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return false;
    }
    const tasks = await prisma.task.findMany({
        select: {
            id: true,
            title: true,
            status: true,
        },
        where: {
            userId: user.id,
        },
    })
    return tasks;
}

export const getSubTasks = async (email: string, taskId: number) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    if (!user || !task) {
        return false;
    }
    if (user.id !== task.userId) {
        return false;
    }
    const subTasks = await prisma.subTask.findMany({
        select: {
            id: true,
            title: true,
            status: true,
        },
        where: {
            taskId,
        },
    })
    return subTasks;
}

export const createTask = async (email: string, title: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        return false;
    }
    const task = await prisma.task.create({
        data: {
            title,
            userId: user.id,
        }
    })
    return task;
}
export const createSubTask = async (email: string, taskId: number, title: string) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    if (!task || !user) {
        return false;
    }
    if (task.userId !== user.id) {
        return false;
    }
    const subTask = await prisma.subTask.create({
        data: {
            title,
            taskId
        }
    })
    return subTask;
}

export const updateTask = async (email: string, taskId: number, title: string, status: boolean) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    if (!task || !user) {
        return false;
    }
    if (task.userId !== user.id) {
        return false;
    }
    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            title,
            status,
        },
    }) 
    return updatedTask; 
}

export const updateSubTask = async (email: string, taskId: number, title: string, status: boolean, subTaskId: number) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    const subTask = await prisma.subTask.findUnique({ where: { id: subTaskId } })
    if (!task || !user || !subTask) {
        return false;
    }
    if (task.userId !== user.id) {
        return false;
    } else if (task.id !== subTask.taskId) {
        return false;
    }
    const updatedSubTask = await prisma.subTask.update({
        where: { id: subTaskId },
        data: {
            title,
            status,
        },
    }) 
    return updatedSubTask; 
}

export const deleteTask = async (email: string, taskId: number) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    if (!task || !user) {
        return false;
    }
    if (task.userId !== user.id) {
        return false;
    }
    await prisma.task.delete({
        where: { id: taskId },
    })
    await prisma.subTask.deleteMany({
        where: { taskId },
    })
    return true;
}

export const deleteSubTask = async (email: string, taskId: number, subTaskId: number) => {
    const user = await prisma.user.findUnique({ where: { email } })
    const task = await prisma.task.findUnique({ where: { id: taskId } })
    const subTask = await prisma.subTask.findUnique({ where: { id: subTaskId } })
    if (!task || !user || !subTask) {
        return false;
    }
    if (task.userId !== user.id) {
        return false;
    } else if (task.id !== subTask.taskId) {
        return false;
    }
    await prisma.subTask.delete({
        where: { id: subTaskId },
    })
    return true;
}