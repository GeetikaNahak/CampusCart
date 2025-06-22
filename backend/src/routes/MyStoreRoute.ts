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
router.post("/",upload.single("imageFile"),jwtCheck,jwtParse,validateMyStoreRequest, MyStoreController.createMyStore);
export default router;