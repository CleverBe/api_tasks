import { RequestHandler } from "express";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";
import { AuthService } from "../services/auth";
import { CustomError } from "../types";

export class AuthController {
  static login: RequestHandler = async (req, res, next) => {
    console.log({ body: req.body });
    try {
      const validation = loginUserSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { username, password } = validation.data;

      const user = await AuthService.login({ username, password });

      res.json({ token: user.token });
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

  static register: RequestHandler = async (req, res, next) => {
    try {
      const validation = registerUserSchema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json({
          error: validation.error.flatten().fieldErrors,
        });
      }

      const { username, password } = validation.data;

      const user = await AuthService.register({ username, password });

      res.status(201).json({
        id: user.id,
        username: user.username,
        status: user.status,
        createdAt: user.createdAt,
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
}
