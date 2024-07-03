import { RequestHandler } from "express";
import { UsersService } from "../services/users";
// import { UsersService } from "../services/users";
import jwt from "jsonwebtoken";
import { JWT_PAYLOAD } from "../types";
import { config } from "../config";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      error: {
        message: "No token provided",
      },
    });
  }

  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        message: "Invalid token format",
      },
    });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: {
        message: "No token provided",
      },
    });
  }

  try {
    const jwt_secret = config.JWT_SECRET;

    const decoded = jwt.verify(token, jwt_secret) as JWT_PAYLOAD;

    // @ts-ignore
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
  }
};
