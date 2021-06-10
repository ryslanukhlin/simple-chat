import { Router } from 'express';
import authRouter from './Auth.route';
import userRouter from './User.router';

const globalRouter: Router[] = [authRouter, userRouter];

export default globalRouter;
