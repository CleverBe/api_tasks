import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/authenticaction";

const router = Router();

router
  .route("/")
  .get(UsersController.getAllUsers)
  .post(UsersController.createUser);

router
  .route("/:id")
  .get(authMiddleware, UsersController.getUserById)
  .put(authMiddleware, UsersController.updateUser)
  .patch(authMiddleware, UsersController.updateUserStatus)
  .delete(authMiddleware, UsersController.deleteUser);

router.get("/:id/tasks", UsersController.getUserTasks);

export default router;
