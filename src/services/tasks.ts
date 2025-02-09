import { prisma } from "../database";
import { CustomError } from "../types";

export class TasksService {
  static async getAllTasks(userId: number) {
    const tasks = await prisma.task.findMany({
      where: { userId },
      select: { id: true, title: true, done: true },
    });

    return tasks;
  }

  static async getTaskById({ id, userId }: { id: number; userId: number }) {
    const task = await prisma.task.findUnique({
      where: { id, userId },
      select: { id: true, title: true, done: true },
    });

    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    return task;
  }

  static async createTask({
    title,
    userId,
  }: {
    title: string;
    userId: number;
  }) {
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });

    return task;
  }

  static async updateTask({
    id,
    title,
    done,
    userId,
  }: {
    id: number;
    title: string;
    done: boolean;
    userId: number;
  }) {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    });

    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id, userId },
      data: {
        title,
        done,
      },
    });

    return updatedTask;
  }

  static async deleteTask({ id, userId }: { id: number; userId: number }) {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    });

    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    await prisma.task.delete({ where: { id, userId } });
  }

  static async changeTaskStatus({
    id,
    done,
    userId,
  }: {
    id: number;
    done: boolean;
    userId: number;
  }) {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    });

    if (!task) {
      throw new CustomError("Task not found", 404);
    }

    const updatedTask = await prisma.task.update({
      where: { id, userId },
      data: {
        done,
      },
    });

    return updatedTask;
  }
}
