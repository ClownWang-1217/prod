
import { currentUserHandler } from '../middlewares/current-user';
import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', currentUserHandler, (req, res) => {

    res.status(200).send({ currentUser: res.currentUser || null });
});

export { router as currentUserRouter };