import express from "express";
import {createCurrentUser, updateCurrentUser} from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser);
router.put("/",jwtCheck,jwtParse,updateCurrentUser);
export default router;
