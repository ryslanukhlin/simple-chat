import { Router } from 'express';

import { searchUserController } from '../controller/searchUser.controller';
import { getUser } from '../controller/user.controller';
import { authMiddelware } from '../middleware/authMiddelware';

const userRouter = Router();

userRouter.get('/user', authMiddelware, getUser);
userRouter.post('/searchUser', searchUserController);

export default userRouter;
