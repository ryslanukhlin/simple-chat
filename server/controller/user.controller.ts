import { Request, Response } from 'express';
import { TUserModel } from '../types/User';

export const getUser = (req: Request, res: Response) => {
    const user: TUserModel = res.locals.user;
    return res.status(200).json(user);
};
