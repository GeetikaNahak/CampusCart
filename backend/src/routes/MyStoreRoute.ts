import express, { Router } from 'express';
import multer from 'multer';
import MyStoreController from '../controllers/MyStoreController';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateMyStoreRequest } from '../middleware/validation';

const router=Router();
const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024, //5mb
    }
})
// Route : /api/my/store
router.get("/",jwtCheck,jwtParse,MyStoreController.getMyStore);
router.post("/",upload.single("imageFile"),jwtCheck,jwtParse, MyStoreController.createMyStore);
router.put("/",upload.single("imageFile"),jwtCheck,jwtParse,MyStoreController.updateMyStore);
export default router;