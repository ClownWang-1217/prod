import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const requestValidationHandler = (req: Request, res: Response, next: NextFunction) => {     
    const error = validationResult(req); 
    console.log(req)   
    if(!error.isEmpty()) {
        throw new RequestValidationError(error.array());
    } 
    next();
}