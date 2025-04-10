import { Request,Response,NextFunction } from "express";
import {body, validationResult} from "express-validator";
import { copyFile } from "fs";
const handleValidationErrors = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
}

export const validateMyUserRequest=[
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("collegeId").isString().notEmpty().withMessage("College Id must be a string"),
    body("branch").isString().notEmpty().withMessage("Branch must be a string"),
    handleValidationErrors,
];