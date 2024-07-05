import { z } from "zod";

export const registerUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginUserSchema = z.object({
  ...registerUserSchema.shape,
});
