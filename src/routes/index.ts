import { Router } from "express";

import user from "./user";
import auth from "./auth";
import list from "./list";
import task from "./task";

const router = Router();

// User Controller
router.use("/user", user);

// Auth Controller
router.use("/auth", auth);

// List Controller
router.use("/list", list);

// Task Controller
router.use("/task", task);

export default router;
