import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    res.send('hi thered is  signout')
});

export { router as signOutRouter };