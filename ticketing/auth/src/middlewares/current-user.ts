import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RequestBadError } from '../errors/request-bad-error';

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Response {
            currentUser: UserPayload
        }
    }
}

export const currentUserHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        res.currentUser = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    } catch (error) {
        console.log(error);

    } 
    next();

};   