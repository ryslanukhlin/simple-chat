import { Router } from 'express';
import { searchUserController } from '../controller/searchUser.controller';
import { getUser } from '../controller/user.controller';
import { setAvatarUser } from '../controller/setAvatarUser.controller';
import { authMiddelware } from '../middleware/authMiddelware';
import { avatarMiddelware } from '../middleware/avatarMuddelware';
import { upload } from '../multer';

const userRouter = Router();

userRouter.get('/user', authMiddelware, getUser);
userRouter.post('/searchUser', searchUserController);
userRouter.post(
    '/downloadIcon',
    authMiddelware,
    upload.single('avatar'),
    avatarMiddelware,
    setAvatarUser,
);

export default userRouter;
