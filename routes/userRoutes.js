import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js';
import { loginValidation, registrationValidation, validate } from '../validation/validation.js';

const userRouter = express.Router()

userRouter.post('/register',registrationValidation,validate,registerUser)
userRouter.post('/login',loginValidation,validate,loginUser)


export default userRouter;