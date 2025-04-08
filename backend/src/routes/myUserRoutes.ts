import express from "express";
import MyUserController from "../controllers/MyUserController";
import exp from "constants";
const router = express.Router();
router.post('/',MyUserController.createCurrentUser);
export default router;