import { Router } from 'express';

import { loginController } from '../controller/login.controller';
import { registerController } from '../controller/register.controller';
import { UserCreateCheckSchema } from '../middleware/validator/User.validator';

const authRouter = Router();

authRouter.post('/register', UserCreateCheckSchema, registerController);
authRouter.post('/login', loginController);

export default authRouter;
