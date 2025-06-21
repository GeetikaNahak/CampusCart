import express from "express";
import {getCurrentUser, createCurrentUser, updateCurrentUser} from "../controllers/MyUserController";
import { validateMyUserRequest } from "../middleware/validation";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();
router.get("/",jwtCheck,jwtParse,getCurrentUser);
router.post("/", jwtCheck, createCurrentUser);
router.put("/",jwtCheck,jwtParse,validateMyUserRequest,updateCurrentUser);
export default router;
