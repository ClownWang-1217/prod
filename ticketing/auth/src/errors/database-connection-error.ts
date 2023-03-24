import { CustomError } from './custom-error';
import { StatusCode } from '../status/status-code';
export class DatabaseConnectionError extends CustomError {
    constructor(message: string) {
        super(message);
    }
    statusCode = StatusCode.INTERNALSERVERERROR;

    serializeErrors() {
        return [
            { message: this.message }
        ];
    }
    
}

