import jwt from "jsonwebtoken";
import { JWT_PAYLOAD } from "../types";
import { config } from "../config";

export const signToken = (payload: JWT_PAYLOAD) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};
