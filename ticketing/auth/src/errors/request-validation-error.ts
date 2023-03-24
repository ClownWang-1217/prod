import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import { StatusCode } from '../status/status-code';
export class RequestValidationError extends CustomError {
    constructor(private errors: ValidationError[], message?: string) {
        super(message);

    }
    statusCode = StatusCode.BADREQUEST;
    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param };
        });
    }
    
}
