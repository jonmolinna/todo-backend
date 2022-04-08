import { Router } from "express";
import { ListController } from "../controller/ListController";
import { checkJwt } from "../utils/jwt";

const router = Router();

// List Router
router.post("/", [checkJwt], ListController.addList);
router.get("/", [checkJwt], ListController.getListAllByUser);
router.delete("/:idList", [checkJwt], ListController.deleteListByUserId);

export default router;
