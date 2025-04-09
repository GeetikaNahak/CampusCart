import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

router.post("/", MyUserController.createCurrentUser);
router.put("/",MyUserController.updateCurrentUser);
export default router;
