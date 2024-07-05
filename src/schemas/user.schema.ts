import { UserStatus } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const updateUserStatusSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export const updateUserSchema = z.object({
  ...createUserSchema.shape,
});
