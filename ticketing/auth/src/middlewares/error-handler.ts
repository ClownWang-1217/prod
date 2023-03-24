
import { Response, Request, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-error';
import { StatusCode } from '../status/status-code';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.serializeErrors());
    }
    return res.status(StatusCode.BADREQUEST).send({
        errors: [{ message: 'Something went wrong' + err }]
    });
};