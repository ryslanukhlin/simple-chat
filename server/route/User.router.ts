import { Router } from 'express';
import { getUser } from '../controller/user.controller';
import { authMiddelware } from '../middleware/authMiddelware';

const userRouter = Router();

userRouter.get('/user', authMiddelware, getUser);

export default userRouter;
