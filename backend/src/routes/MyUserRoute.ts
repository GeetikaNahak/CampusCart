import express from "express";
import MyUserController from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/",jwtCheck,jwtParse,validateMyUserRequest,MyUserController.updateCurrentUser);
export default router;
