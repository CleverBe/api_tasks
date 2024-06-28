import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
});

export const updateTaskDoneSchema = z.object({
  done: z.boolean(),
});

export const updateTaskSchema = z.object({
  ...createTaskSchema.shape,
  ...updateTaskDoneSchema.shape, // TODO: verificar si es necesario pasar el done
});
