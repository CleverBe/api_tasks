import { RequestHandler } from "express";
import { UsersService } from "../services/users";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "../schemas/user.schema";
import { CustomError } from "../types";

export class UsersController {
  static getAllUsers: RequestHandler = async (req, res, next) => {
    try {
      const users = await UsersService.getAllUsers();

      const mappedUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
        password: user.password,
        status: user.status,
      }));

      res.json(mappedUsers);
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

  static getUserById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const user = await UsersService.getUserById(parsedId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        status: user.status,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
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

  static createUser: RequestHandler = async (req, res, next) => {
    try {
      const validation = createUserSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { username, password } = validation.data;

      const duplicateUser = await UsersService.getUserByUsername(username);

      if (duplicateUser) {
        return res.status(409).json({
          error: { message: "User already exists" },
        });
      }

      const user = await UsersService.createUser({ username, password });

      res.json({
        id: user.id,
        username: user.username,
        status: user.status,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
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

  static updateUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const validation = updateUserSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { username, password } = validation.data;

      const duplicateUser = await UsersService.getUserByUsername(username);

      if (duplicateUser && duplicateUser.id !== parsedId) {
        return res.status(409).json({
          error: { message: "Username already exists" },
        });
      }

      const user = await UsersService.updateUser({
        id: Number(id),
        username,
        password,
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

  static deleteUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      await UsersService.deleteUser(Number(id));

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

  static updateUserStatus: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const validation = updateUserStatusSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { status } = validation.data;

      const user = await UsersService.updateUserStatus({
        id: parsedId,
        status,
      });

      res.json({
        id: user.id,
        username: user.username,
        password: user.password,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
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

  static getUserTasks: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (isNaN(parsedId) || !Number.isInteger(parsedId)) {
      return res.status(400).json({ error: { message: "Invalid id" } });
    }

    try {
      const userWithTasks = await UsersService.getUserTasks(parsedId);

      res.json(userWithTasks);
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
