import { Router } from 'express';
import authRouter from './Auth.route';

const globalRouter: Router[] = [authRouter];

export default globalRouter;
