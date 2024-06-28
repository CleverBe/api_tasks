import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const router = Router();

router
  .route("/")
  .get(TasksController.getAllTasks)
  .post(TasksController.createTask);

router
  .route("/:id")
  .get(TasksController.getTaskById)
  .put(TasksController.updateTask)
  .patch(TasksController.changeTaskStatus)
  .delete(TasksController.deleteTask);

export default router;
