import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const rules = [
    body('email').isEmail().isLength({ min: 10, max: 50 }),
    body(['title', 'description']).isString().isLength({ min: 10, max: 50 }),
    body('thumb').isString().notEmpty(),
    body('content').isString().isLength({ min: 10 })
];

export const validator = (request: Request, response: Response, next: any) => {
    const errors = validationResult(request);

    if(!errors.isEmpty())
        return response.status(400).json({ error: errors.array() });

    next();
};