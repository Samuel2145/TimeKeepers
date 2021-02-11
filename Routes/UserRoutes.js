import express from 'express'
import * as user from '../Controllers/UserController.js'

const userRouter = express.Router();

userRouter.post('/createUser', user.createUser);
userRouter.get('/userLogin', user.userLogin)


export default userRouter;
