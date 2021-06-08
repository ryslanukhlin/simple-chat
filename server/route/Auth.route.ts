import { Router } from 'express';
import { registerController } from '../controller/register.controller';
import { UserCreateCheckSchema } from '../middleware/validator/User.validator';

const authRouter: Router = Router();

authRouter.post('/register', UserCreateCheckSchema, registerController);

export default authRouter;
