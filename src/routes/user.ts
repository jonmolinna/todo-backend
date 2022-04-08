import { Router } from "express";

import { UserController } from "../controller/UserController";

const router = Router();

// Create User
router.post("/", UserController.registerUser);

export default router;
