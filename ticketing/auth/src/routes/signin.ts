import express, { Response, Request } from 'express';
import { validationResult, body } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { RequestBadError } from '../errors/request-bad-error';
import { requestValidationHandler } from '../middlewares/request-validation-handler';
import { Password } from '../services/password';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { StatusCode } from '../status/status-code';
const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('email must be valid !'),
    body('password').trim().notEmpty().withMessage('password must be valid !')
], requestValidationHandler, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
        throw new RequestBadError('Invalid credential');
    }
    const result = await Password.compare(exisitingUser.password, password);
    if (!result) {
        throw new RequestBadError('Invalid credential');
    }
    const userJwt = jwt.sign(
        {
            id: exisitingUser.id,
            email: exisitingUser.email
        },
        process.env.JWT_KEY!
    );
    req.session = {  
        jwt: userJwt 
    }
    return res.status(StatusCode.OK).send(exisitingUser);
});

export { router as signInRouter };