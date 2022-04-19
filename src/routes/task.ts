import { Router } from "express";
import { TasksController } from "../controller/TasksController";
import { checkJwt } from "../utils/jwt";

const router = Router();

// Task Router
router.post("/", [checkJwt], TasksController.addTask);
router.delete("/", [checkJwt], TasksController.deleteTask);
router.put("/", [checkJwt], TasksController.updatedTask);

export default router;
