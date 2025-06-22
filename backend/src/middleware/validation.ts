import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); 
};

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("collegeId").isString().notEmpty().withMessage("College Id must be a string"),
    body("branch").isString().notEmpty().withMessage("Branch must be a string"),
    handleValidationErrors,
];

export const validateMyStoreRequest=[
    body("storeName")
    .notEmpty().withMessage("Store Name is required")
    .isLength({ min: 2 }).withMessage("Store Name must be at least 2 characters"),

  body("location")
    .notEmpty().withMessage("Location is required"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),

  body("imageUrl")
    .notEmpty().withMessage("Image URL is required")
    .isURL().withMessage("Image URL must be a valid URL"),

  body("cuisines")
    .isArray({ min: 1 }).withMessage("At least one cuisine is required"),

  body("cuisines.*")
    .notEmpty().withMessage("Cuisine must not be empty"),

  body("items")
    .isArray({ min: 1 }).withMessage("At least one item is required"),

  body("items.*.name")
    .notEmpty().withMessage("Each item must have a name"),

  body("items.*.price")
    .isFloat({ min: 0 }).withMessage("Each item must have a valid price"),

  body("items.*.available")
    .isBoolean().withMessage("Each item must have an availability status"),

  body("lastUpdated")
    .notEmpty().withMessage("Last updated date is required")
    .isISO8601().withMessage("Last updated must be a valid date"),
    handleValidationErrors,
];
