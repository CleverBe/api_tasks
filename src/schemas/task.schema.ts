import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const updateTaskDoneSchema = z.object({
  done: z.boolean(),
});

export const updateTaskSchema = z.object({
  ...createTaskSchema.shape,
});
