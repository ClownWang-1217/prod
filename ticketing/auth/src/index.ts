import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose'
import cookiesession from 'cookie-session'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(json());
app.set('trust proxy', 1);
app.use(cookiesession({ 
    secure: true,
    signed: false 
}));

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*', (req, res, next) => {
   throw new NotFoundError();
});
app.use(errorHandler);
const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('the JWT_KEY must be defined');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv')
            .then(() => {
                console.log('Connected!')
                app.listen(3000, () => {
                    console.log('Listening on port 3000!!!!');
                });
            });
    } catch (error) {
        console.log(error);
    }
}
start();