import { RequestHandler } from "express";
import { TasksService } from "../services/tasks";
import {
  createTaskSchema,
  updateTaskDoneSchema,
  updateTaskSchema,
} from "../schemas/task.schema";
import { CustomError } from "../types";

export class TasksController {
  static getAllTasks: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    try {
      const tasks = await TasksService.getAllTasks(user.id);

      res.json(tasks);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  static getTaskById: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    const { id } = req.params;
    console.log({ id });

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const task = await TasksService.getTaskById({
        id: parsedId,
        userId: user.id,
      });

      res.json(task);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  static createTask: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    console.log({ body: req.body });

    try {
      const validation = createTaskSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { name } = validation.data;

      const task = await TasksService.createTask({ name, userId: user.id });

      res.status(201).json(task);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  static updateTask: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    const { id } = req.params;
    console.log({ id, body: req.body });

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const validation = updateTaskSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { name } = validation.data;

      const task = await TasksService.updateTask({
        id: parsedId,
        name,
        userId: user.id,
      });

      res.json([1]);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  static deleteTask: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    const { id } = req.params;
    console.log({ id });

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      await TasksService.deleteTask({ id: parsedId, userId: user.id });

      res.sendStatus(204);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };

  static changeTaskStatus: RequestHandler = async (req, res, next) => {
    // @ts-ignore
    const user = req.user as { id: number; username: string };

    const { id } = req.params;
    console.log({ id, body: req.body });

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    const validation = updateTaskDoneSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.flatten().fieldErrors,
      });
    }

    const { done } = validation.data;

    try {
      const task = await TasksService.changeTaskStatus({
        id: parsedId,
        userId: user.id,
        done,
      });

      res.json([1]);
    } catch (error) {
      if (error instanceof CustomError) {
        res
          .status(error.status || 500)
          .json({ error: { message: error.message } });
      } else {
        next(error);
      }
    }
  };
}
