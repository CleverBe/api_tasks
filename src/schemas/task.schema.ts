import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string(),
});

export const updateTaskDoneSchema = z.object({
  done: z.boolean(),
});

export const updateTaskSchema = z.object({
  ...createTaskSchema.shape,
});
