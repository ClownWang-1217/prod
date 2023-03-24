import { CustomError } from './custom-error';
import { StatusCode } from '../status/status-code';
class RequestBadError extends CustomError {
    constructor(message: string) {
        super(message);
    }
    statusCode = StatusCode.BADREQUEST;
    serializeErrors() {
        return [
            { message: this.message }
        ]  
    }
}

export { RequestBadError }