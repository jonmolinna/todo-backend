import { Router } from "express";
import { TasksController } from "../controller/TasksController";
import { checkJwt } from "../utils/jwt";

const router = Router();

// Task Router
router.post("/:idList", [checkJwt], TasksController.addTask);
router.get("/:idList", [checkJwt], TasksController.getAllTaskByListAndUser);
router.delete("/:idList", [checkJwt], TasksController.deleteTask);
router.put("/:idList", [checkJwt], TasksController.updatedTask);

export default router;
