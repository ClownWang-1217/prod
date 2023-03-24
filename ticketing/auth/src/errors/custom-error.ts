import { StatusCode } from '../status/status-code';
interface ErrorConstructor {
    message: string;
    field?: string;

}

abstract class CustomError extends Error {
    constructor(message?: string) {
        super(message);
    }
    abstract statusCode: any;
    abstract serializeErrors(): Array<ErrorConstructor>;


}
export { CustomError }