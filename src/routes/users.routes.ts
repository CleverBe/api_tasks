import { Router } from "express";
import { UsersController } from "../controllers/users.controller";

const router = Router();

router
  .route("/")
  .get(UsersController.getAllUsers)
  .post(UsersController.createUser);

router
  .route("/:id")
  .get(UsersController.getUserById)
  .put(UsersController.updateUser)
  .patch(UsersController.updateUserStatus)
  .delete(UsersController.deleteUser);

router.get("/:id/tasks", UsersController.getUserTasks);

export default router;
