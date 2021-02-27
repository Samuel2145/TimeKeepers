import express from 'express'
import * as user from '../Controllers/UserController.js'

const userRouter = express.Router();

userRouter.post('/createUser', user.createUser);
userRouter.post('/userLogin', user.userLogin);
userRouter.get('/getUserInfo', user.getUserInfo);

export default userRouter;
