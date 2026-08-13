import { NextFunction, Response } from 'express';
import { body, validationResult } from 'express-validator';


export const validateCredentials = [
    body('username').notEmpty().withMessage("Username is required.")
    .not().matches(/^[\d\s]/).withMessage("Username cannot start with a number or space.")
    .isAlphanumeric().withMessage("Username must contain only letters and numbers (a-z, 0-9).")
    .isLength({min:5}).withMessage("Username must be at least 5 characters long.")
    .isLength({max:32}).withMessage("Username cannot exceed 32 characters."),

    body('password').notEmpty().withMessage("Password is required.")
    .not().matches("^\\d|\\s").withMessage("Password cannot start with a number or space.")
    .isLength({min:8}).withMessage("Password must be at least 8 characters long."),
    (req:Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessage = errors.array()[0];
            return res.status(400).json({ error: errorMessage.msg });
        }
        next();
    },
]
