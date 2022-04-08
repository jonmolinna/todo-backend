import { Router } from "express";

import { AuthController } from "../controller/AuthController";

const router = Router();

// Auth User
router.post("/", AuthController.login);

export default router;
