import { CustomError } from './custom-error';
import { StatusCode } from '../status/status-code';
export class NotFoundError extends CustomError {
    
    constructor(message?: string) {
        super(message);
    }
    statusCode = StatusCode.NOTFOUND;
    serializeErrors() {
        return [{ message: this.message }];
    }
}