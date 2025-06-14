import express from "express";
import MyUserController from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/",validateMyUserRequest,MyUserController.updateCurrentUser);
export default router;
