import express from 'express'
import * as user from '../Controllers/UserController.js'

const userRouter = express.Router();

userRouter.post('/createGrouping', user.createGrouping);
userRouter.post('/createUser', user.createUser);
userRouter.post('/createAvailability', user.createAvailability);
userRouter.post('/createParameter', user.createParameter);
userRouter.post('/createShift', user.createShift);
userRouter.post('/userLogin', user.userLogin);
userRouter.get('/getUserInfo', user.getUserInfo);
userRouter.get('/getCalendar', user.getCalendar);
userRouter.get('/isLoggedIn', user.isLoggedIn);
userRouter.post('/logout', user.Logout);
userRouter.get('/getGroupParameterData', user.getGroupParameterData);


export default userRouter;
